import { SMSState, initialState } from './sms.state';
import * as actions from './sms.actions';
import { SMS, SMSResponse } from '../../shared/models/sms.model';

export function SMSReducer (
  state: SMSState = initialState,
  action: actions.Actions
): SMSState {
  switch ( action.type ) {
    /* Get List */
    case actions.GET_SMS_LIST:
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
    case actions.CREATE_SMS:
      return {
        ...state,
        processing: true,
      };

    case actions.CREATE_SMS_SUCCESFUL:
      return {
        ...state,
        didFetch: false,
        processing: false,
        data: [],
      };

    /* Update */
    case actions.UPDATE_SMS:
      return {
        ...state,
        processing: true,
      };

    case actions.UPDATE_SMS_SUCCESFUL:
      return updateSuccessful( state, action.payload );

    /* Toggle */
    case actions.UPDATE_STATUS:
      return {
        ...state,
        processing: true,
      };

    case actions.UPDATE_STATUS_SUCCESFUL:
      return updateSuccessful( state, action.payload );

    /* Delete */
    case actions.DELETE_SMS:
      return {
        ...state,
        processing: true,
      };

    case actions.DELETE_SMS_SUCCESSFUL:
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
  state: SMSState,
  result: SMSResponse
): SMSState {
  return {
    ...state,
    fetching: false,
    didFetch: true,
    data: result.data,
    meta: result.meta,
  };
}

function updateSuccessful ( state: SMSState, result: SMS ): SMSState {
  const data = state.data.slice( 0 );
  const index = data.findIndex( ( item: SMS ) => item.id === result?.id );
  data.splice( index, 1, result );
  return {
    ...state,
    processing: false,
    data: data,
  };
}


