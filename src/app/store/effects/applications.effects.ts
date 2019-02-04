import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import * as ApplicantsActions from '../actions/applications.actions';
import { ApplicationTypes } from '../types/applications.types';
import { ApplicationsService } from '../../services/applications.service';

@Injectable()
export class ApplicationEffects {
  constructor(
    private applService: ApplicationsService,
    private actions$: Actions,
  ) {}

  @Effect()
  GetApplicants = this.actions$.pipe(
    ofType(ApplicationTypes.GetApplicants),
    map((action: ApplicantsActions.GetApplicants) => action.payload),
    mergeMap((payload) => {
      return this.applService.getApplications(payload.jobId, payload.type).pipe(
        map((res) => {
          return new ApplicantsActions.GetApplicantsSuccess(res);
        }),
        catchError((err) => {
          return of(new ApplicantsActions.GetApplicantsFail(err));
        }),
      );
    }),
  );

  @Effect()
  SendNote = this.actions$.pipe(
    ofType(ApplicationTypes.SendNote),
    map((action: ApplicantsActions.SendNote) => action.payload),
    mergeMap((payload) => {
      return this.applService.sendNote(payload.id, payload.note).pipe(
        map((res) => {
          return new ApplicantsActions.SendNoteSuccess({ res, note: payload.note, idx: payload.idx });
        }),
        catchError(err => of(new ApplicantsActions.SendNoteFail(err))),
      );
    }),
  );

  @Effect()
  ChangeRating = this.actions$.pipe(
    ofType(ApplicationTypes.ChangeRating),
    map((action: ApplicantsActions.ChangeRating) => action.payload),
    mergeMap((payload) => {
      return this.applService.setRating(payload.id, payload.i).pipe(
        map((res) => {
          const { r, i } = payload;
          return new ApplicantsActions.ChangeRatingSuccess({ r, i });
        }),
        catchError(err => of(new ApplicantsActions.ChangeRatingFail(err))),
      );
    }),
  );

  @Effect()
  ChangeStatus = this.actions$.pipe(
    ofType(ApplicationTypes.ChangeStatus),
    map((action: ApplicantsActions.ChangeStatus) => action.payload),
    mergeMap((payload) => {
      return this.applService.changeApplicationStatus(payload.id, payload.status).pipe(
        map(() => new ApplicantsActions.ChangeStatusSuccess({ jobId: payload.jobId, type: payload.page })),
        catchError(err => of(new ApplicantsActions.ChangeStatusFail(err))),
      );
    }),
  );

  @Effect()
  ChangeStatusSuccess = this.actions$.pipe(
    ofType(ApplicationTypes.ChangeStatusSuccess),
    map((action: ApplicantsActions.ChangeStatusSuccess) => {
      return new ApplicantsActions.GetApplicants({ jobId: action.payload.jobId, type: action.payload.type });
    }),
  );
}
