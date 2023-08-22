import { Action } from '@ngrx/store';
import { Create_Email, Delete_Email, EmailResponse, Update_Email, Update_Email_Status, Filter } from '../../shared/models/email.model';

/**
 * Actions
 */

export const SET_DID_FETCH = '@lc/Email/set-isbusy';
export class SetDidFetch implements Action {
  readonly type = SET_DID_FETCH;
  constructor ( public payload: boolean ) { }
}

//#region Get List
export const GET_EMAIL_LIST = '@lc/email/get-email-list';
export class GetEmailList implements Action {
  readonly type = GET_EMAIL_LIST;
  constructor ( public payload: Filter ) { }
}
//#endregion

//#region Get List Success
export const GET_LIST_SUCCESS = '@lc/email/get-email-list-success';

export class GetEmailListSuccess implements Action {
  readonly type = GET_LIST_SUCCESS;
  constructor ( public payload: EmailResponse ) { }
}
//#endregion

//#region Update Filter
export const UPDATE_FILTER = '@lc/email/update-filter';

export class UpdateFilter implements Action {
  readonly type = UPDATE_FILTER;
  constructor ( public payload: object ) { }
}
//#endregion


//#region Update Meta
export const UPDATE_META = '@lc/email/update-meta';

export class UpdateMeta implements Action {
  readonly type = UPDATE_META;
  constructor ( public payload: object ) { }
}
//#endregion


export const GET_EMAIL_FAILED = '@lc/email/get-email-failed';
export class GetEmailFailed implements Action {
  readonly type = GET_EMAIL_FAILED;
  constructor ( public payload: any ) { }
}


export const CREATE_EMAIL = '@lc/email/create-email';
export class CreateEmail implements Action {
  readonly type = CREATE_EMAIL;
  constructor ( public payload: Create_Email ) { }
}

export const CREATE_EMAIL_SUCCESFUL = '@lc/email/create-email-successful';
export class CreateEmailSuccessful implements Action {
  readonly type = CREATE_EMAIL_SUCCESFUL;
  constructor ( public payload: any ) { }
}

export const CRATE_EMAIL_FAILED = '@lc/email/create-email-failed';
export class CreateEmailFailed implements Action {
  readonly type = CRATE_EMAIL_FAILED;
  constructor ( public payload: any ) { }
}

export const UPDATE_EMAIL = '@lc/email/update-email';
export class UpdateEmail implements Action {
  readonly type = UPDATE_EMAIL;
  constructor ( public payload: Update_Email ) { }
}

export const UPDATE_EMAIL_SUCCESFUL = '@lc/email/update-email-successful';
export class UpdateEmailSuccessful implements Action {
  readonly type = UPDATE_EMAIL_SUCCESFUL;
  constructor ( public payload: any ) { }
}

export const UPDATE_EMAIL_FAILED = '@lc/email/update-email-failed';
export class UpdateEmailFailed implements Action {
  readonly type = UPDATE_EMAIL_FAILED;
  constructor ( public payload: any ) { }
}

export const UPDATE_STATUS = '@lc/email/update-status';
export class UpdateStatus implements Action {
  readonly type = UPDATE_STATUS;
  constructor ( public payload: Update_Email_Status ) { }
}

export const UPDATE_STATUS_SUCCESFUL = '@lc/email/update-status-successful';
export class UpdateStatusSuccessful implements Action {
  readonly type = UPDATE_STATUS_SUCCESFUL;
  constructor ( public payload: any ) { }
}

export const DELETE_EMAIL = '@lc/email/delete-Email';
export class DeleteEmail implements Action {
  readonly type = DELETE_EMAIL;
  constructor ( public payload: Delete_Email ) {
  }
}

export const DELETE_EMAIL_SUCCESSFUL = '@lc/email/delete-email-successful';
export class DeleteEmailSuccessful implements Action {

  readonly type = DELETE_EMAIL_SUCCESSFUL;
  constructor ( public payload: any ) {
  }
}

export const DELETE_EMAIL_FAILED = '@lc/email/delete-email-failed';
export class DeleteEmailFailed implements Action {
  readonly type = DELETE_EMAIL_FAILED;
  constructor ( public payload: any ) { }
}


//#region Clear Detail
export const CLEAR_DETAIL = '@lc/email/clear-detail';
export class ClearDetail implements Action {
  readonly type = CLEAR_DETAIL;
  constructor () { }
}
//#endregion

// Actions data type
export type Actions =
  | SetDidFetch
  | GetEmailList
  | UpdateFilter
  | UpdateMeta
  | GetEmailListSuccess
  | GetEmailFailed
  | CreateEmail
  | CreateEmailSuccessful
  | CreateEmailFailed
  | UpdateEmail
  | UpdateEmailSuccessful
  | UpdateEmailFailed
  | UpdateStatus
  | UpdateStatusSuccessful
  | DeleteEmail
  | DeleteEmailSuccessful
  | DeleteEmailFailed
  | ClearDetail;
