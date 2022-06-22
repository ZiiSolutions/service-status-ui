import {
  discardPeriodicTasks,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Mock } from 'ts-mocks';
import { AppConfigService } from './app-config.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { StatusApiService } from './status-api.service';
import { ApiStatusResponse } from './app-interfaces';

describe('StatusApiService', () => {
  let service: StatusApiService;
  let httpMock: HttpTestingController;

  const mockBaseUrl = 'https://some-path';
  const mockUrl = `${mockBaseUrl}/status`;

  function assertRequestAndFlush(url: string, response: ApiStatusResponse) {
    const request = httpMock.expectOne(url);
    expect(request.request.method).toBe('GET');
    // return the mocked response
    request.flush(response);
  }

  function assertRequestAndFlushError(status: number) {
    // Note: the HTTP request has been coded to retry 3 times on failure
    // to get the error message we must execute the request 4 times
    // hence the [1, 2, 3, 4].forEach
    [1, 2, 3, 4].forEach(() => {
      const request = httpMock.expectOne(mockUrl);
      expect(request.request.method).toBe('GET');
      // Return 404 error
      request.flush([], {
        status,
        statusText: 'Not found',
      });
    });
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: AppConfigService,
          useFactory: () =>
            new Mock<AppConfigService>({
              apiBaseUrl: mockBaseUrl,
            }).Object,
        },
      ],
    });
    service = TestBed.inject(StatusApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Ensures that no request is outstanding
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get data from /status endpoint every 10 seconds', fakeAsync(() => {
    // Mock data response from backend
    const mockRes: ApiStatusResponse = [
      { name: 'BBC', isHealthy: true },
      { name: 'ITV', isHealthy: true },
      { name: 'CNN', isHealthy: true },
      { name: 'News Now', isHealthy: true },
      { name: 'ARY', isHealthy: true },
    ];

    service.fetchAllServiceChecks().subscribe((res: any) => {
      expect(res).toEqual(mockRes);
    });

    // Use tick() to fake the interval time to emulate polling
    assertRequestAndFlush(mockUrl, mockRes);
    tick(10000);
    assertRequestAndFlush(mockUrl, mockRes);
    tick(10000);
    assertRequestAndFlush(mockUrl, mockRes);
    tick(10000);
    assertRequestAndFlush(mockUrl, mockRes);

    discardPeriodicTasks();
  }));

  it('should capture 404 server side error', fakeAsync(() => {
    service.fetchAllServiceChecks().subscribe({
      next: (res) => fail(`Should have failed with error but got ${res}`),
      error: (err) => {
        expect(err).toEqual(
          'Not Found: Http failure response for https://some-path/status: 404 Not found'
        );
      },
    });

    assertRequestAndFlushError(404);
    discardPeriodicTasks();
  }));

  it('should capture 403 serverr side error', fakeAsync(() => {
    service.fetchAllServiceChecks().subscribe({
      next: (res) => fail(`Should have failed with error but got ${res}`),
      error: (err) => {
        expect(err).toEqual(
          'Access Denied: Http failure response for https://some-path/status: 403 Not found'
        );
      },
    });

    assertRequestAndFlushError(403);
    discardPeriodicTasks();
  }));

  it('should capture 500 server side error', fakeAsync(() => {
    service.fetchAllServiceChecks().subscribe({
      next: (res) => fail(`Should have failed with error but got ${res}`),
      error: (err) => {
        expect(err).toEqual(
          'Internal Server Error: Http failure response for https://some-path/status: 500 Not found'
        );
      },
    });

    assertRequestAndFlushError(500);
    discardPeriodicTasks();
  }));

  it('should an unknown error (303)', fakeAsync(() => {
    service.fetchAllServiceChecks().subscribe({
      next: (res) => fail(`Should have failed with error but got ${res}`),
      error: (err) => {
        expect(err).toEqual(
          'Unknown Server Error: Http failure response for https://some-path/status: 303 Not found'
        );
      },
    });

    assertRequestAndFlushError(303);
    discardPeriodicTasks();
  }));
});
