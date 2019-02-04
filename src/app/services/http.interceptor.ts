import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { NotificationService } from './notification.service';

import * as Sentry from '@sentry/browser';
Sentry.init({
  dsn: environment.logServiceUrl,
});

@Injectable()
export class HttpMainInterceptor implements HttpInterceptor {
  constructor(private alert: NotificationService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message || error }`;
          Sentry.captureException(error);
        } else {
          // server-side error
          try {
            console.log(error);
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message || error.message}`;
          } catch (err) {
            console.log(err);
          }
          Sentry.captureException(error);
        }
        Sentry.captureException(error);
        this.alert.error(errorMessage);
        return throwError(errorMessage);
      }),
    );
  }
}
