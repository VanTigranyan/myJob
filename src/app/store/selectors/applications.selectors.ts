import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardState } from '../reducers';
import { ApplicationState } from '../reducers/applications.reducer';

export const dashboardState = createFeatureSelector<DashboardState>('dashboard');

export const getApplicationState = createSelector(
  dashboardState,
  (state: DashboardState) => {
    return state.applicationState;
  },
);

export const getApplications = createSelector(
  getApplicationState,
  (state: ApplicationState) => state.applications,
);

export const getJobInfo = createSelector(
  getApplicationState,
  (state: ApplicationState) => state.job,
);

export const getPagePanding = createSelector(
  getApplicationState,
  (state: ApplicationState) => state.pageIsPanding,
);

export const getErrorMessage = createSelector(
  getApplicationState,
  (state: ApplicationState) => state.error,
);

export const getNotePending = createSelector(
  getApplicationState,
  (state: ApplicationState) => state.noteIsPending,
);

export const getEditableNote = createSelector(
  getApplicationState,
  (state: ApplicationState) => state.isEditable,
);

export const getRatePanding = createSelector(
  getApplicationState,
  (state: ApplicationState) => state.rateIsPanding,
);
