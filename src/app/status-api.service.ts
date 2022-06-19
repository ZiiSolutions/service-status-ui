import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Injectable } from '@angular/core';
import {
  catchError,
  interval,
  Observable,
  retry,
  startWith,
  Subject,
  switchMap,
  takeUntil,
  throwError,
} from 'rxjs';
import { AppConfigService } from './app-config.service';
import { ApiStatusResponse } from './app-interfaces';

@Injectable({
  providedIn: 'root',
})
export class StatusApiService {
  constructor(
    private appConfig: AppConfigService,
    private httpClient: HttpClient
  ) { }
  // Stop polling to avoid memory leaks
  private readonly _stopPolling = new Subject<boolean>();

  fetchAllServiceChecks(): Observable<ApiStatusResponse> {
    return interval(10000).pipe(
      startWith(0),
      takeUntil(this._stopPolling),
      switchMap(() =>
        this.httpClient
          .get<ApiStatusResponse>(`${this.appConfig.apiBaseUrl}/status`)
          .pipe(
            retry(3),
            catchError((err) =>
              throwError(() => this.retrieveErrorMessage(err))
            )
          )
      )
    );
  }

  set stopPolling(value: boolean) {
    this._stopPolling.next(value);
  }

  private retrieveErrorMessage(err: HttpErrorResponse): string {
    // Handle both client & server errors. Would be good to create an interface for server side error.
    // However, leaving it as is for simplicity.
    return err.error instanceof Error
      ? `Client side error occurred: ${err.error.message}`
      : this.getServerErrorMessage(err);
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 404: {
        return `Not Found: ${error.message}`;
      }
      case 403: {
        // Currently the API doesn't require authentication.
        // But good idea to make the code future proof.
        return `Access Denied: ${error.message}`;
      }
      case 500: {
        return `Internal Server Error: ${error.message}`;
      }
      default: {
        return `Unknown Server Error: ${error.message}`;
      }
    }
  }
}
