import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

/*
 *Helper functions for common unit testing operations.
 */

export const getElementByCss = (fixture: ComponentFixture<any>, css: string) =>
  getElementByCssDebugElement(fixture.debugElement, css);

export const getElementsByCss = (fixture: ComponentFixture<any>, css: string) =>
  getElementsByCssDebugElement(fixture.debugElement, css);

export const getElementByCssDebugElement = (
  debugElement: DebugElement,
  css: string
) => debugElement.query(By.css(css));

export const getElementsByCssDebugElement = (
  debugElement: DebugElement,
  css: string
) => debugElement.queryAll(By.css(css));

export const getTextContent = (debugElement: DebugElement) =>
  debugElement.nativeElement.textContent!.trim();
