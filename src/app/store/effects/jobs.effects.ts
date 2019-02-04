import { Injectable } from '@angular/core';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { JobsService } from '../../services/jobs.service';
import { NotificationService } from '../../services/notification.service';
import { JobActionTypes } from '../../store/types/jobs.types';
import { LoadJobs, LoadJobsSuccess, LoadJobsFail } from '../../store/actions/jobs.actions';
import { ToggleJobActivation, ToggleJobActivationSuccess, ToggleJobActivationFail } from './../actions/jobs.actions';
import { JobsResponse } from './../../models/jobsResponse.model';

@Injectable()
export class JobEffects {
  constructor(
    private actions$: Actions,
    private jobsService: JobsService,
    private alert: NotificationService,
  ) {}

  @Effect()
  LoadJobs = this.actions$.pipe(
    ofType(JobActionTypes.LoadJobs),
    map((action: LoadJobs) => action.payload),
    mergeMap((payload) => {
      return this.jobsService.getAllJobs(payload.params, payload.id).pipe(
        map((res: JobsResponse) => {
          return new LoadJobsSuccess(res);
        }),
        catchError((error) => {
          return of(new LoadJobsFail(error));
        }),
      );
    }),
  );

  @Effect()
  ToggleJobActivation = this.actions$.pipe(
    ofType(JobActionTypes.ToggleJobActivation),
    map((action: ToggleJobActivation) => action.payload),
    mergeMap((payload) => {
      return this.jobsService.toggleActivation(payload.id).pipe(
        map((res) => {
          console.log(res);
          return new ToggleJobActivationSuccess({ res, idx: payload.idx });
        }),
        catchError((err) => {
          return of(new ToggleJobActivationFail(err));
        }),
      );
    }),
  );

  @Effect({ dispatch: false })
  ToggleJobActivationSuccess = this.actions$.pipe(
    ofType(JobActionTypes.ToggleJobActivationSuccess),
    map((action: ToggleJobActivationSuccess) => {
      this.alert.success('Activation status changing was successful!');
    }),
  );
}
