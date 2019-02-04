import { Action } from '@ngrx/store';

import { AuthActionTypes } from '../types/auth.types';
import { LoginResponse } from '../../models/loginResponse.model';

export class Login implements Action {
  readonly type = AuthActionTypes.Login;
  constructor(public payload: any) {}
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess;
  constructor(public payload: LoginResponse) {}
}

export class LoginFail implements Action {
  readonly type = AuthActionTypes.LoginFail;
  constructor(public payload: string) {}
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}

export type AuthActions = Login
                        | LoginSuccess
                        | LoginFail
                        | Logout;
