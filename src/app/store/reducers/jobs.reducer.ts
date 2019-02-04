import { Job } from '../../models/job.model';
import { JobActions } from '../actions/jobs.actions';
import { JobActionTypes } from '../types/jobs.types';

// export interface State extends State {
//   jobsState: JobsState;
// }

export interface JobsState {
  jobs: Job[];
  total: number;
  jobsLoading: boolean;
  activationIsPending: number | null;
  error: string | null;
}

const initState: JobsState = {
  jobs: [],
  total: 0,
  jobsLoading: false,
  activationIsPending: null,
  error: null,
};

export function jobReducer(state: JobsState = initState, action: JobActions): JobsState {
  const { type, payload } = action;
  switch (type) {
    case JobActionTypes.LoadJobs:
      return { ...state, jobsLoading: true };
    case JobActionTypes.LoadJobsSuccess:
      return { ...state, jobsLoading: false, jobs: payload.jobs, total: payload.total };
    case JobActionTypes.LoadJobsFail:
      return { ...state, jobsLoading: false, error: payload };

    case JobActionTypes.ToggleJobActivation:
      return { ...state, activationIsPending: payload.idx };
    case JobActionTypes.ToggleJobActivationSuccess:
      const allJobs = [...state.jobs];
      allJobs[payload.idx].is_active = !allJobs[payload.idx].is_active;
      return { ...state, activationIsPending: null, jobs: allJobs };
    case JobActionTypes.ToggleJobActivationFail:
      return { ...state, activationIsPending: null, error: payload };

    default:
      return state;
  }
}
