import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  getElementByCss,
  getElementsByCss,
  getTextContent,
} from '../util/test-util';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a title reading Service Monitor', () => {
    expect(getTextContent(getElementByCss(fixture, 'h1'))).toEqual(
      'Service Monitor'
    );
  });

  it('should display a header tag so that the HTML is semantically correct', () => {
    expect(getElementsByCss(fixture, 'header')).toBeTruthy();
  });
});
