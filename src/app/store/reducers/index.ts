import { AuthState, authReducer } from './auth.reducer';
import { JobsState, jobReducer } from './jobs.reducer';
import { ApplicationState, applicationReducer } from './applications.reducer';

export interface AppState {
  authState: AuthState;
}

export interface DashboardState {
  jobState: JobsState;
  applicationState: ApplicationState;
}

export interface State  {
  dashboardState: DashboardState;
  appState: AppState;
}

export const reducers = {
  authState: authReducer,
  jobState: jobReducer,
  applicationState: applicationReducer,
};
