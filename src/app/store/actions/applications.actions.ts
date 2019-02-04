import { Action } from '@ngrx/store';

import { ApplicationTypes } from '../types/applications.types';

export class GetApplicants implements Action {
  readonly type = ApplicationTypes.GetApplicants;
  constructor(public payload: { jobId: number, type: string }) {}
}

export class GetApplicantsSuccess implements Action {
  readonly type = ApplicationTypes.GetApplicatsSuccess;
  constructor(public payload: any) {}
}

export class GetApplicantsFail implements Action {
  readonly type = ApplicationTypes.GetApplicantsFail;
  constructor(public payload: string) {}
}

export class EditNote implements Action {
  readonly type = ApplicationTypes.EditNote;
  constructor(public payload: number) {}
}

export class SendNote implements Action {
  readonly type = ApplicationTypes.SendNote;
  constructor(public payload: { id: string | number, note: string, idx: number | string }) {}
}

export class SendNoteSuccess implements Action {
  readonly type  = ApplicationTypes.SendNoteSuccess;
  constructor(public payload: { res: any, note: string, idx: number | string }) {}
}

export class SendNoteFail implements Action {
  readonly type = ApplicationTypes.SendNoteFail;
  constructor(public payload: string) {}
}

export class ChangeRating implements Action {
  readonly type = ApplicationTypes.ChangeRating;
  constructor(public payload: { r: number, id: number, i: number }) {}
}

export class ChangeRatingSuccess implements Action {
  readonly type = ApplicationTypes.ChnageRatingSuccess;
  constructor(public payload: { r: number, i: number }) {}
}

export class ChangeRatingFail implements Action {
  readonly type = ApplicationTypes.ChangeRatingFail;
  constructor(public payload: string) {}
}

export class ChangeStatus implements Action {
  readonly type = ApplicationTypes.ChangeStatus;
  constructor(public payload: { id: number, status: string, jobId: number, page: string }) {}
}

export class ChangeStatusSuccess implements Action {
  readonly type = ApplicationTypes.ChangeStatusSuccess;
  constructor(public payload: { jobId: number, type: string }) {}
}

export class ChangeStatusFail implements Action {
  readonly type = ApplicationTypes.ChangeStatusFail;
  constructor(public payload: string) {}
}

export type ApplicantsActions = GetApplicants
                              | GetApplicantsSuccess
                              | GetApplicantsFail
                              | EditNote
                              | SendNote
                              | SendNoteSuccess
                              | SendNoteFail
                              | ChangeRating
                              | ChangeRatingSuccess
                              | ChangeRatingFail
                              | ChangeStatus
                              | ChangeStatusSuccess
                              | ChangeStatusFail;
