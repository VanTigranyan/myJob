import { User } from '../../models/user.model';
import { AuthActions } from '../actions/auth.actions';
import { AppActions } from '../actions/app.actions';
import { AuthActionTypes } from '../types/auth.types';
import { AppActionTypes } from '../types/app.types';

export interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
  error: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  token: null,
  error: null,
};

export function authReducer(state: AuthState = initialState, action: AuthActions | AppActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.LoginSuccess:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };
    case AuthActionTypes.LoginFail:
      return {
        ...state,
        error: action.payload,
      };
    case AppActionTypes.LocalLoginSuccess:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };
    case AuthActionTypes.Logout:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
}
