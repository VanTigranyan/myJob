import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt';

import { AppActionTypes } from '../types/app.types';
import { LocalLogin, LocalLoginSuccess, LocalLoginFail } from './../actions/app.actions';

const jwt = new JwtHelperService();

@Injectable()
export class AppEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
  ) {}

  @Effect()
  LocalLogin: Observable<any> = this.actions$.pipe(
    ofType(AppActionTypes.LocalLogin),
    map((action: LocalLogin) => {
      const token = localStorage.getItem('token');
      if (token) {
        /**
         *  TODO: This part should be uncommented, as it can check
         *  the expiration of the token.
         */

        // if (jwt.isTokenExpired(token)) {
        //   return new LocalLoginFail();
        // }
        const user = jwt.decodeToken(token);
        return new LocalLoginSuccess({
          user,
          token,
        });
      }
      return new LocalLoginFail();
    }),
  );

  @Effect({ dispatch: false })
  LocalLoginSuccess: Observable<any> = this.actions$.pipe(
    ofType(AppActionTypes.LocalLoginSuccess),
    map((action: LocalLoginSuccess) => {
      this.router.navigate(['/employers/job-list'], { queryParams: { page: 'active' } });
    }),
  );
}
