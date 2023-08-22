import { Action } from '@ngrx/store';
import { WorkflowState, initialState } from './workflow.state';

import * as actions from './workflow.actions';
import { Workflow, workflowResponse } from '../../shared/models/workflow.model';


export function workflowReducer (
  state: WorkflowState = initialState,
  action: actions.Actions
): WorkflowState {
  switch ( action.type ) {
  /* Get List */
  case actions.GET_LIST:
    return {
      ...state,
      didFetch: false,
      fetching: true,
      data: [],
    };
  case actions.GET_LIST_SUCCESS:
    return getListSuccessful( state, action.payload );

  case actions.UPDATE_FILTER:
    return {
      ...state,
      didFetch: false,
      data: [],
      filter: {
        ...state.filter,
        ...action.payload,
      },
    };
  case actions.UPDATE_META:
    return {
      ...state,
      meta: {
        ...state.meta,
        ...action.payload,
      },
    };
  /* Create */
  case actions.CREATE_WORKFLOW:
    return {
      ...state,
      processing: true,
    };

  case actions.CREATE_WORKFLOW_SUCCESFUL:
    return {
      ...state,
      didFetch: false,
      processing: false,
      data: [],
    };

  /* Update */
  case actions.UPDATE_WORKFLOW:
    return {
      ...state,
      processing: true,
    };

  case actions.UPDATE_WORKFLOW_SUCCESFUL:
    return updateSuccessful( state, action.payload );

  /* Toggle */
  case actions.UPDATE_WORKFLOW_STATUS:
    return {
      ...state,
      processing: true,
    };

  case actions.UPDATE_WORKFLOW_STATUS_SUCCESFUL:
    return updateSuccessful( state, action.payload );

  /* Delete */
  case actions.DELETE_WORKFLOW:
    return {
      ...state,
      processing: true,
    };

  case actions.DELETE_WORKFLOW_SUCCESSFUL:
    return {
      ...state,
      processing: false,
      didFetch: false,
      data: [],
    };

  case actions.CLEAR_DETAIL:
    return {
      ...initialState,
    };
  default:
    return state;
  }
}

function getListSuccessful (
  state: WorkflowState,
  result: workflowResponse
): WorkflowState {
  return {
    ...state,
    fetching: false,
    didFetch: true,
    data: result.data,
    meta: result.meta,
  };
}

function updateSuccessful ( state: WorkflowState, result: Workflow ): WorkflowState {
  const data = state.data.slice( 0 );
  const index = data.findIndex( ( item: Workflow ) => item.id == result?.id );
  data.splice( index, 1, result );
  return {
    ...state,
    processing: false,
    data: data,
  };
}


