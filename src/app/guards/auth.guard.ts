import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthState } from '../store/reducers/auth.reducer';
import * as authSelectors from '../store/selectors/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store<AuthState>,
    private router: Router,
  ) {}

  getActivationStatus(): Observable<any> {
    return this.store.select(authSelectors.getAuthStatus);
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.pipe(
      select(authSelectors.getAuthStatus),
      tap((status) => {
        if (status) {
          return true;
        }
        this.router.navigate(['/employers/login']);
        return false;
      }),
    );
  }
}
