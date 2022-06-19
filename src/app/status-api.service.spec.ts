import { TestBed } from '@angular/core/testing';

import { StatusApiService } from './status-api.service';

describe('StatusApiService', () => {
  let service: StatusApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
