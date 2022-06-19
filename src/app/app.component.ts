import { Component, OnDestroy } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { ApiStatusResponse } from './app-interfaces';
import { StatusApiService } from './status-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  readonly items$: Observable<ApiStatusResponse>;
  errorMessage: string;

  constructor(private apiService: StatusApiService) {
    this.items$ = this.apiService.fetchAllServiceChecks().pipe(
      catchError((err) => {
        this.errorMessage = err;
        return of();
      })
    );
  }

  ngOnDestroy() {
    // When the component is destroyed stop polling to cancel
    // subscription. This will avoid memory leaks
    this.apiService.stopPolling = true;
  }
}
