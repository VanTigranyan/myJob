import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { exhaustMap, map, catchError, tap } from 'rxjs/operators';

import { NotificationService } from '../../services/notification.service';
import { AuthService } from './../../services/auth.service';
import { AuthActionTypes } from '../types/auth.types';
import { Login, LoginSuccess, LoginFail } from '../actions/auth.actions';
import { LoginResponse } from '../../models/loginResponse.model';

@Injectable()
export class AuthEffects {
  constructor(
    private authService: AuthService,
    private actions$: Actions,
    private router: Router,
    private alert: NotificationService) {}

  @Effect()
  Login: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.Login),
    map((action: Login) => action.payload),
    exhaustMap((payload) => {
      return this.authService.login(payload.username, payload.password).pipe(
        map((res: LoginResponse) => {
          return new LoginSuccess(res);
        }),
        catchError((err) => {
          return of(new LoginFail(err));
        }),
      );
    }),
  );

  @Effect({ dispatch: false })
  LoginSuccess: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.LoginSuccess),
    tap((res) => {
      localStorage.setItem('token', res.payload.token);
      this.alert.success('Welcome to MyJobs!');
      this.router.navigate(['/employers/job-list'], { queryParams: { page: 'active' } });
    }),
  );

  @Effect({ dispatch: false })
  LoginFail: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.LoginFail),
    map((action: LoginFail) => action.payload),
    tap((message) => {
      this.alert.error(message);
    }),
  );

  @Effect({ dispatch: false })
  Logout: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.Logout),
    map((action: AuthActionTypes.Logout) => {
      this.alert.note('Good Bye!\nHope to see you again soon!');
      localStorage.removeItem('token');
      this.router.navigate(['/employers/login']);
    }),
  );
}
