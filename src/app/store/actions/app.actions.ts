import { Action } from '@ngrx/store';

import { AppActionTypes } from '../types/app.types';
import { LoginResponse } from '../../models/loginResponse.model';

export class LocalLogin implements Action {
  readonly type = AppActionTypes.LocalLogin;
}

export class LocalLoginSuccess implements Action {
  readonly type = AppActionTypes.LocalLoginSuccess;
  constructor(public payload: LoginResponse) {}
}

export class LocalLoginFail implements Action {
  readonly type = AppActionTypes.LocalLoginFail;
}

export type AppActions = LocalLogin
                       | LocalLoginSuccess
                       | LocalLoginFail;
