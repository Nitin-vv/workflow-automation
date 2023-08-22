import { Action } from '@ngrx/store';
import { Create_Sms, Delete_Sms, SMSResponse, Update_Sms, Update_Sms_Status, Filter } from '../../shared/models/sms.model';

/**
 * Actions
 */

export const SET_DID_FETCH = '@lc/sms/set-isbusy';
export class SetDidFetch implements Action {
  readonly type = SET_DID_FETCH;
  constructor ( public payload: boolean ) { }
}

//#region Get List
export const GET_SMS_LIST = '@lc/sms/get-sms-list';
export class GetSmsList implements Action {
  readonly type = GET_SMS_LIST;
  constructor ( public payload: Filter ) { }
}
//#endregion

//#region Get List Success
export const GET_LIST_SUCCESS = '@lc/sms/get-sms-list-success';

export class GetSmsListSuccess implements Action {
  readonly type = GET_LIST_SUCCESS;
  constructor ( public payload: SMSResponse ) { }
}
//#endregion

//#region Update Filter
export const UPDATE_FILTER = '@lc/sms/update-filter';

export class UpdateFilter implements Action {
  readonly type = UPDATE_FILTER;
  constructor ( public payload: object ) { }
}
//#endregion


//#region Update Meta
export const UPDATE_META = '@lc/sms/update-meta';

export class UpdateMeta implements Action {
  readonly type = UPDATE_META;
  constructor ( public payload: object ) { }
}
//#endregion


export const GET_SMS_FAILED = '@lc/sms/get-sms-failed';
export class GetSmsFailed implements Action {
  readonly type = GET_SMS_FAILED;
  constructor ( public payload: any ) { }
}


export const CREATE_SMS = '@lc/sms/create-sms';
export class CreateSms implements Action {
  readonly type = CREATE_SMS;
  constructor ( public payload: Create_Sms ) { }
}

export const CREATE_SMS_SUCCESFUL = '@lc/sms/create-sms-successful';
export class CreateSmsSuccessful implements Action {
  readonly type = CREATE_SMS_SUCCESFUL;
  constructor ( public payload: any ) { }
}

export const CRATE_SMS_FAILED = '@lc/sms/create-sms-failed';
export class CreateSmsFailed implements Action {
  readonly type = CRATE_SMS_FAILED;
  constructor ( public payload: any ) { }
}

export const UPDATE_SMS = '@lc/sms/update-sms';
export class UpdateSms implements Action {
  readonly type = UPDATE_SMS;
  constructor ( public payload: Update_Sms ) { }
}

export const UPDATE_SMS_SUCCESFUL = '@lc/sms/update-sms-successful';
export class UpdateSmsSuccessful implements Action {
  readonly type = UPDATE_SMS_SUCCESFUL;
  constructor ( public payload: any ) { }
}

export const UPDATE_SMS_FAILED = '@lc/sms/update-sms-failed';
export class UpdateSmsFailed implements Action {
  readonly type = UPDATE_SMS_FAILED;
  constructor ( public payload: any ) { }
}

export const UPDATE_STATUS = '@lc/sms/update-status';
export class UpdateStatus implements Action {
  readonly type = UPDATE_STATUS;
  constructor ( public payload: Update_Sms_Status ) { }
}

export const UPDATE_STATUS_SUCCESFUL = '@lc/sms/update-status-successful';
export class UpdateStatusSuccessful implements Action {
  readonly type = UPDATE_STATUS_SUCCESFUL;
  constructor ( public payload: any ) { }
}

export const DELETE_SMS = '@lc/sms/delete-sms';
export class DeleteSms implements Action {
  readonly type = DELETE_SMS;
  constructor ( public payload: Delete_Sms ) {
  }
}

export const DELETE_SMS_SUCCESSFUL = '@lc/sms/delete-sms-successful';
export class DeleteSmsSuccessful implements Action {

  readonly type = DELETE_SMS_SUCCESSFUL;
  constructor ( public payload: any ) {
  }
}

export const DELETE_SMS_FAILED = '@lc/sms/delete-sms-failed';
export class DeleteSmsFailed implements Action {
  readonly type = DELETE_SMS_FAILED;
  constructor ( public payload: any ) { }
}


//#region Clear Detail
export const CLEAR_DETAIL = '@lc/sms/clear-detail';
export class ClearDetail implements Action {
  readonly type = CLEAR_DETAIL;
  constructor () { }
}
//#endregion

// Actions data type
export type Actions =
  | SetDidFetch
  | GetSmsList
  | UpdateFilter
  | UpdateMeta
  | GetSmsListSuccess
  | GetSmsFailed
  | CreateSms
  | CreateSmsSuccessful
  | CreateSmsFailed
  | UpdateSms
  | UpdateSmsSuccessful
  | UpdateSmsFailed
  | UpdateStatus
  | UpdateStatusSuccessful
  | DeleteSms
  | DeleteSmsSuccessful
  | DeleteSmsFailed
  | ClearDetail;
