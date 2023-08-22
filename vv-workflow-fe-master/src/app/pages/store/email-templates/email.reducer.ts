import { initialState, EmailState } from './email.state';
import * as actions from './email.actions';
import { SMS, SMSResponse } from '../../shared/models/sms.model';
import { Email, EmailResponse } from '../../shared/models/email.model';

export function EmailReducer (
  state: EmailState = initialState,
  action: actions.Actions
): EmailState {
  switch ( action.type ) {
    /* Get List */
    case actions.GET_EMAIL_LIST:
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
    case actions.CREATE_EMAIL:
      return {
        ...state,
        processing: true,
      };

    case actions.CREATE_EMAIL_SUCCESFUL:
      return {
        ...state,
        didFetch: false,
        processing: false,
        data: [],
      };

    /* Update */
    case actions.UPDATE_EMAIL:
      return {
        ...state,
        processing: true,
      };

    case actions.UPDATE_EMAIL_SUCCESFUL:
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
    case actions.DELETE_EMAIL:
      return {
        ...state,
        processing: true,
      };

    case actions.DELETE_EMAIL_SUCCESSFUL:
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
  state: EmailState,
  result: EmailResponse
): EmailState {
  return {
    ...state,
    fetching: false,
    didFetch: true,
    data: result.data,
    meta: result.meta,
  };
}

function updateSuccessful ( state: EmailState, result: Email ): EmailState {
  const data = state.data.slice( 0 );
  const index = data.findIndex( ( item: Email ) => item.id === result?.id );
  data.splice( index, 1, result );
  return {
    ...state,
    processing: false,
    data: data,
  };
}


