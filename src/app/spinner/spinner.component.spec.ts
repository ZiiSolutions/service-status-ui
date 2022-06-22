import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getElementByCss } from '../util/test-util';

import { SpinnerComponent } from './spinner.component';

describe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpinnerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display 2 cubes for depicting a spinner', () => {
    expect(getElementByCss(fixture, '.cube1')).toBeTruthy();
    expect(getElementByCss(fixture, '.cube2')).toBeTruthy();
  });
});
