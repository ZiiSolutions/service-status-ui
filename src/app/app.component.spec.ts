import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { StatusApiService } from './status-api.service';
import { Mock } from 'ts-mocks';
import { of } from 'rxjs';
import { HeaderComponent } from './header/header.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { MockComponent } from 'ng-mocks';
import { StatusCardComponent } from './status-card/status-card.component';
import { getElementByCss, getElementsByCss } from './util/test-util';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  const mockData = [
    { name: 'BBC', isHealthy: true },
    { name: 'ITV', isHealthy: true },
    { name: 'CNN', isHealthy: true },
    { name: 'News Now', isHealthy: true },
    { name: 'ARY', isHealthy: true },
  ];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        AppComponent,
        HeaderComponent,
        SpinnerComponent,
        MockComponent(StatusCardComponent),
      ],
      providers: [
        {
          provide: StatusApiService,
          useFactory: () =>
            new Mock<StatusApiService>({
              fetchAllServiceChecks: () => of(mockData),
            }).Object,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should display header component', () => {
    expect(getElementByCss(fixture, 'app-header')).toBeTruthy();
  });

  it('should display 5 status card components', () => {
    expect(getElementsByCss(fixture, 'app-status-card').length).toEqual(5);
  });
});
