import { Action } from '@ngrx/store';
import { Get_Workflow, Create_Workflow, Update_Workflow, Delete_Workflow, Filter, workflowResponse, Workflow, Update_Workflow_Status } from '../../shared/models/workflow.model';

/**
 * Actions
 */

export const SET_DID_FETCH = '@lc/workflow/set-isbusy';
export class SetDidFetch implements Action {
  readonly type = SET_DID_FETCH;
  constructor ( public payload: boolean ) { }
}

//#region Get List
export const GET_LIST = '@lc/workflow/get-list';
export class GetList implements Action {
  readonly type = GET_LIST;
  constructor ( public payload: Filter ) { }
}
//#endregion

//#region Get List Success
export const GET_LIST_SUCCESS = '@lc/workflow/get-list-success';

export class GetListSuccess implements Action {
  readonly type = GET_LIST_SUCCESS;
  constructor ( public payload: workflowResponse ) { }
}
//#endregion

//#region Update Filter
export const UPDATE_FILTER = '@lc/workflow/update-filter';

export class UpdateFilter implements Action {
  readonly type = UPDATE_FILTER;
  constructor ( public payload: object ) { }
}
//#endregion


//#region Update Meta
export const UPDATE_META = '@lc/workflow/update-meta';

export class UpdateMeta implements Action {
  readonly type = UPDATE_META;
  constructor ( public payload: object ) { }
}
//#endregion


export const GET_WORKFLOW_FAILED = '@lc/workflow/get-workflow-failed';
export class GetWorkflowFailed implements Action {
  readonly type = GET_WORKFLOW_FAILED;
  constructor ( public payload: any ) { }
}


export const CREATE_WORKFLOW = '@lc/workflow/create-workflow';
export class CreateWorkflow implements Action {
  readonly type = CREATE_WORKFLOW;
  constructor ( public payload: any ) { }
}

export const CREATE_WORKFLOW_SUCCESFUL = '@lc/workflow/create-workflow-successful';
export class CreateWorkflowSuccessful implements Action {
  readonly type = CREATE_WORKFLOW_SUCCESFUL;
  constructor ( public payload: any ) { }
}

export const CRATE_WORKFLOW_FAILED = '@lc/workflow/create-workflow-failed';
export class CreateWorkflowFailed implements Action {
  readonly type = CRATE_WORKFLOW_FAILED;
  constructor ( public payload: Create_Workflow ) { }
}

export const UPDATE_WORKFLOW = '@lc/workflow/update-workflow';
export class UpdateWorkflow implements Action {
  readonly type = UPDATE_WORKFLOW;
  constructor ( public payload ) { }
}

export const UPDATE_WORKFLOW_SUCCESFUL = '@lc/workflow/update-workflow-successful';
export class UpdateWorkflowSuccessful implements Action {
  readonly type = UPDATE_WORKFLOW_SUCCESFUL;
  constructor ( public payload: any ) { }
}

export const UPDATE_WORKFLOW_FAILED = '@lc/workflow/update-workflow-failed';
export class UpdateWorkflowFailed implements Action {
  readonly type = UPDATE_WORKFLOW_FAILED;
  constructor ( public payload: Workflow ) { }
}

export const UPDATE_WORKFLOW_STATUS = '@lc/workflow/update-workflow-status';
export class UpdateWorkflowStatus implements Action {
  readonly type = UPDATE_WORKFLOW_STATUS;
  constructor ( public payload ) { }
}

export const UPDATE_WORKFLOW_STATUS_SUCCESFUL = '@lc/workflow/update-workflow-status-successful';
export class UpdateWorkflowStatusSuccessful implements Action {
  readonly type = UPDATE_WORKFLOW_STATUS_SUCCESFUL;
  constructor ( public payload: any ) { }
}

export const DELETE_WORKFLOW = '@lc/workflow/delete-workflow';
export class DeleteWorkflow implements Action {
  readonly type = DELETE_WORKFLOW;
  constructor ( public payload: any ) {
  }
}

export const DELETE_WORKFLOW_SUCCESSFUL = '@lc/workflow/delete-workflow-successful';
export class DeleteWorkflowSuccessful implements Action {

  readonly type = DELETE_WORKFLOW_SUCCESSFUL;
  constructor ( public payload: Delete_Workflow ) {
  }
}

export const DELETE_WORKFLOW_FAILED = '@lc/workflow/delete-workflow-failed';
export class DeleteWorkflowFailed implements Action {
  readonly type = DELETE_WORKFLOW_FAILED;
  constructor ( public payload: Delete_Workflow ) { }
}


//#region Clear Detail
export const CLEAR_DETAIL = '@lc/workflow/clear-detail';
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
  | GetWorkflowFailed
  | CreateWorkflow
  | CreateWorkflowSuccessful
  | CreateWorkflowFailed
  | UpdateWorkflow
  | UpdateWorkflowSuccessful
  | UpdateWorkflowFailed
  | UpdateWorkflowStatus
  | UpdateWorkflowStatusSuccessful
  | DeleteWorkflow
  | DeleteWorkflowSuccessful
  | DeleteWorkflowFailed
  | ClearDetail;
