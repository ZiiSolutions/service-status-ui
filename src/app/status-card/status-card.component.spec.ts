import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getElementByCss, getTextContent } from '../util/test-util';

import { StatusCardComponent } from './status-card.component';

describe('StatusCardComponent', () => {
  let component: StatusCardComponent;
  let fixture: ComponentFixture<StatusCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatusCardComponent],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(StatusCardComponent);
    component = fixture.componentInstance;
    component.item = {
      name: 'News Now',
      isHealthy: true,
    };

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a red light', () => {
    expect(getElementByCss(fixture, '.red-light')).toBeTruthy();
  });

  it('should display a green light', () => {
    expect(getElementByCss(fixture, '.green-light')).toBeTruthy();
  });

  it('should display a dimmed red and active green light when servic is available', () => {
    expect(getElementByCss(fixture, '.red-active')).toBeFalsy();
    expect(getElementByCss(fixture, '.green-active')).toBeTruthy();
  });

  it('should display the name of the service', () => {
    expect(getTextContent(getElementByCss(fixture, '.caption'))).toEqual(
      'News Now'
    );
  });

  it('should display a dimmed green and active red light when service unhealthy', async () => {
    component.item = {
      name: 'News Now',
      isHealthy: false,
    };
    fixture.detectChanges();
    await fixture.whenStable();

    expect(getElementByCss(fixture, '.green-active')).toBeFalsy();
    expect(getElementByCss(fixture, '.red-active')).toBeTruthy();
  });
});
