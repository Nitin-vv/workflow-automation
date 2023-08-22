import { Action } from '@ngrx/store';
import { Get_Property, Create_Property, Update_Property, Delete_Property, Filter, PropertyResponse, Property } from '../../shared/models/property.model';

/**
 * Actions
 */

export const SET_DID_FETCH = '@lc/property/set-isbusy';
export class SetDidFetch implements Action {
  readonly type = SET_DID_FETCH;
  constructor ( public payload: boolean ) { }
}

//#region Get List
export const GET_LIST = '@lc/property/get-list';
export class GetList implements Action {
  readonly type = GET_LIST;
  constructor ( public payload: Filter ) { }
}
//#endregion

//#region Get List Success
export const GET_LIST_SUCCESS = '@lc/property/get-list-success';

export class GetListSuccess implements Action {
  readonly type = GET_LIST_SUCCESS;
  constructor ( public payload: PropertyResponse ) { }
}
//#endregion

//#region Update Filter
export const UPDATE_FILTER = '@lc/property/update-filter';

export class UpdateFilter implements Action {
  readonly type = UPDATE_FILTER;
  constructor ( public payload: object ) { }
}
//#endregion


//#region Update Meta
export const UPDATE_META = '@lc/property/update-meta';

export class UpdateMeta implements Action {
  readonly type = UPDATE_META;
  constructor ( public payload: object ) { }
}
//#endregion


export const GET_PROPERTY_FAILED = '@lc/property/get-property-failed';
export class GetPropertyFailed implements Action {
  readonly type = GET_PROPERTY_FAILED;
  constructor ( public payload: any ) { }
}


export const CREATE_PROPERTY = '@lc/property/create-property';
export class CreateProperty implements Action {
  readonly type = CREATE_PROPERTY;
  constructor ( public payload: Create_Property ) { }
}

export const CREATE_PROPERTY_SUCCESFUL = '@lc/property/create-property-successful';
export class CreatePropertySuccessful implements Action {
  readonly type = CREATE_PROPERTY_SUCCESFUL;
  constructor ( public payload: Create_Property ) { }
}

export const CRATE_PROPERTY_FAILED = '@lc/property/create-property-failed';
export class CreatePropertyFailed implements Action {
  readonly type = CRATE_PROPERTY_FAILED;
  constructor ( public payload: Create_Property ) { }
}

export const UPDATE_PROPERTY = '@lc/property/update-property';
export class UpdateProperty implements Action {
  readonly type = UPDATE_PROPERTY;
  constructor ( public payload ) { }
}

export const UPDATE_PROPERTY_SUCCESFUL = '@lc/property/update-property-successful';
export class UpdatePropertySuccessful implements Action {
  readonly type = UPDATE_PROPERTY_SUCCESFUL;
  constructor ( public payload: Property ) { }
}

export const UPDATE_PROPERTY_FAILED = '@lc/property/update-property-failed';
export class UpdatePropertyFailed implements Action {
  readonly type = UPDATE_PROPERTY_FAILED;
  constructor ( public payload: Property ) { }
}

export const UPDATE_PROPERTY_STATUS = '@lc/property/update-property-status';
export class UpdatePropertyStatus implements Action {
  readonly type = UPDATE_PROPERTY_STATUS;
  constructor ( public payload ) { }
}

export const UPDATE_PROPERTY_STATUS_SUCCESFUL = '@lc/property/update-property-status-successful';
export class UpdatePropertyStatusSuccessful implements Action {
  readonly type = UPDATE_PROPERTY_STATUS_SUCCESFUL;
  constructor ( public payload: any ) { }
}

export const DELETE_PROPERTY = '@lc/property/delete-property';
export class DeleteProperty implements Action {
  readonly type = DELETE_PROPERTY;
  constructor ( public payload: any ) {
  }
}

export const DELETE_PROPERTY_SUCCESSFUL = '@lc/property/delete-property-successful';
export class DeletePropertySuccessful implements Action {

  readonly type = DELETE_PROPERTY_SUCCESSFUL;
  constructor ( public payload: Delete_Property ) {
  }
}

export const DELETE_PROPERTY_FAILED = '@lc/property/delete-property-failed';
export class DeletePropertyFailed implements Action {
  readonly type = DELETE_PROPERTY_FAILED;
  constructor ( public payload: Delete_Property ) { }
}


//#region Clear Detail
export const CLEAR_DETAIL = '@lc/property/clear-detail';
export class ClearDetail implements Action {
  readonly type = CLEAR_DETAIL;
  constructor () { }
}
//#endregion

// Actions data type
export type Actions =
  | SetDidFetch
  | GetList
  | UpdateFilter
  | UpdateMeta
  | GetListSuccess
  | GetPropertyFailed
  | CreateProperty
  | CreatePropertySuccessful
  | CreatePropertyFailed
  | UpdateProperty
  | UpdatePropertySuccessful
  | UpdatePropertyFailed
  | UpdatePropertyStatus
  | UpdatePropertyStatusSuccessful
  | DeleteProperty
  | DeletePropertySuccessful
  | DeletePropertyFailed
  | ClearDetail;
