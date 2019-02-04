import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AuthState } from '../reducers/auth.reducer';

const getAuthFeatureState = createFeatureSelector<AuthState>('authState');

export const getAuthStatus = createSelector(
  getAuthFeatureState,
  (state) => {
    return state.isLoggedIn;
  },
);

export const getUserInfo = createSelector(
  getAuthFeatureState,
  state => state.user,
);

export const getAccessToken = createSelector(
  getAuthFeatureState,
  (state) => {
    return state.token;
  },
);

export const getAuthError = createSelector(
  getAuthFeatureState,
  state => state.error,
);
