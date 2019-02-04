import { Action } from '@ngrx/store';

import { JobsResponse } from './../../models/jobsResponse.model';
import { JobActionTypes } from '../types/jobs.types';

export class LoadJobs implements Action {
  readonly type = JobActionTypes.LoadJobs;
  constructor(public payload: { params: any, id: string | number}) {}
}

export class LoadJobsSuccess implements Action {
  readonly type = JobActionTypes.LoadJobsSuccess;
  constructor(public payload: JobsResponse) {}
}

export class LoadJobsFail implements Action {
  readonly type = JobActionTypes.LoadJobsFail;
  constructor(public payload: string) {}
}

export class ToggleJobActivation implements Action {
  readonly type = JobActionTypes.ToggleJobActivation;
  constructor(public payload: {id: number, idx: number }) {}
}

export class ToggleJobActivationSuccess implements Action {
  readonly type = JobActionTypes.ToggleJobActivationSuccess;
  constructor(public payload) {}
}

export class ToggleJobActivationFail implements Action {
  readonly type = JobActionTypes.ToggleJobActivationFail;
  constructor(public payload: string) {}
}

export type JobActions = LoadJobs
                     | LoadJobsSuccess
                     | LoadJobsFail
                     | ToggleJobActivation
                     | ToggleJobActivationSuccess
                     | ToggleJobActivationFail;
