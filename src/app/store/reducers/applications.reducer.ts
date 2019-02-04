import { ApplicationTypes } from '../types/applications.types';
import * as applActions from '../actions/applications.actions';

export interface ApplicationState {
  applications: any[] | null;
  job: object | null;
  pageIsPanding: boolean;
  error: string | null;
  isEditable: number | null;
  noteIsPending: number | null;
  rateIsPanding: number | null;
}

const initState: ApplicationState = {
  applications: [],
  job: null,
  pageIsPanding: false,
  error: null,
  isEditable: null,
  noteIsPending: null,
  rateIsPanding: null,
};

export function applicationReducer(state: ApplicationState = initState, action: applActions.ApplicantsActions): ApplicationState {
  const { type, payload } = action;
  switch (type) {
    case ApplicationTypes.GetApplicants:
      return { ...state, pageIsPanding: true };
    case ApplicationTypes.GetApplicatsSuccess:
      return { ...state, applications: payload.applications, job: payload, pageIsPanding: false };
    case ApplicationTypes.GetApplicantsFail:
      return { ...state, pageIsPanding: false, error: payload };

    case ApplicationTypes.EditNote:
      let s = { ...state };
      s.isEditable = state.isEditable === payload ? null : payload;
      return { ...s, isEditable: payload };

    case ApplicationTypes.SendNote:
      return { ...state, noteIsPending: payload.idx };
    case ApplicationTypes.SendNoteSuccess:
      s = { ...state };
      s.applications[payload.idx].note = payload.note;
      s.job['applications'] = s.applications;
      return { ...s, noteIsPending: null, isEditable: null };
    case ApplicationTypes.SendNoteFail:
      return { ...state, noteIsPending: null, isEditable: null, error: payload };

    case ApplicationTypes.ChangeRating:
      return { ...state, rateIsPanding: payload.i };
    case ApplicationTypes.ChnageRatingSuccess:
      s = { ...state };
      s.applications[payload.i].app_rating = payload.r;
      s.job['applications'] = s.applications;
      return { ...s, rateIsPanding: null };
    case ApplicationTypes.ChangeRatingFail:
      return { ...state, rateIsPanding: null, error: payload };

    default:
      return state;
  }
}
