import { Injectable, ErrorHandler, Injector, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { NotificationService } from '../../services/notification.service';
import { environment } from '../../../environments/environment';

import * as Sentry from '@sentry/browser';

Sentry.init({
  dsn: environment.logServiceUrl,
});

@Injectable()
export class ErrorsHandler implements ErrorHandler {
  constructor(
    private injector: Injector,
    private zone: NgZone,
    ) {}

  handleError(error: Error | HttpErrorResponse) {
    const alert = this.injector.get(NotificationService);
    const router = this.injector.get(Router);
    if (error instanceof HttpErrorResponse) {
      // Server or connection error happend
      if (!navigator.onLine) {
        // Handle offline error
        return alert.warn('No Internet Connection');
      }
      //  Handle HTTP error
      // Sentry.captureException(error);
      // return alert.error(`${error.status} - ${error.message}`);
    } else {
      // Handle Angular internal error
      Sentry.captureException(error);
      this.zone.run(() => {
        router.navigate(['/error'], { queryParams: { error: error.message || error } });
      });
    }

    Sentry.captureException(error);
    console.error('It happens ', error);
  }
}
