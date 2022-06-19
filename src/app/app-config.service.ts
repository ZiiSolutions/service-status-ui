import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

export interface Environment {
  production: boolean;
  apiBaseUrl: string;
}

/**
 * A wrapper around environment to allow mocking for unit tests
 */
@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  config: Environment;

  constructor() {
    this.config = environment;
  }

  get apiBaseUrl() {
    return this.config.apiBaseUrl;
  }
}
