import { createSelector, createFeatureSelector } from '@ngrx/store';

import { JobsState } from '../reducers/jobs.reducer';
import { State, DashboardState } from '../reducers';

export const getDashboardState = createFeatureSelector<DashboardState>('dashboard');

export const getJobState = createSelector(
  getDashboardState,
  state => state.jobState,
);

export const getAllJobs = createSelector(
  getJobState,
  (state: JobsState) => state.jobs,
);

export const getLoadStatus = createSelector(
  getJobState,
  (state: JobsState) => state.jobsLoading,
);

export const getTotalCount = createSelector(
  getJobState,
  (state: JobsState) => state.total,
);

export const getError = createSelector(
  getJobState,
  (state: JobsState) => state.error,
);

export const getActivationPending = createSelector(
  getJobState,
  (state: JobsState) => state.activationIsPending,
);
