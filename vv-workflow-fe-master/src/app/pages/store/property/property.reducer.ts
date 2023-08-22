import { Action } from '@ngrx/store';
import { PropertyState, initialState } from './property.state';

import * as actions from './property.actions';
import { Property, PropertyResponse } from '../../shared/models/property.model';

// export function propertyReducer (
//   state = initialState,
//   action: actions.Actions
// ): PropertyState {
//   switch ( action.type ) {
//   case actions.GET_LIST:
//     return {
//       ...state,
//       didFetch: false,
//       fetching: true,
//       data: [],
//     };
//   case actions.GET_LIST_SUCCESS:
//     return getListSuccessful( state, action.payload );

//   case actions.GET_PROPERTY_FAILED:
//     return {
//       ...state,
//       didFetch: false,
//       fetching: false,
//     };

//   /* Create */
//   case actions.CREATE_PROPERTY:
//     return {
//       ...state,
//       processing: true,
//     };

//   case actions.UPDATE_FILTER:
//     return {
//       ...state,
//       didFetch: false,
//       data: [],
//       filter: {
//         ...state.filter,
//         ...action.payload,
//       },
//     };
//   case actions.UPDATE_META:
//     return {
//       ...state,
//       meta: {
//         ...state.meta,
//         ...action.payload,
//       },
//     };

//   case actions.CREATE_PROPERTY_SUCCESFUL:
//     return {
//       ...state,
//       didFetch: false,
//       processing: false,
//       data: [],
//     };

//   /* Update */
//   case actions.UPDATE_PROPERTY:
//     return {
//       ...state,
//       processing: true,
//     };

//   case actions.UPDATE_PROPERTY_SUCCESFUL:
//     return updateSuccessful( state, action.payload );

//   case actions.UPDATE_PROPERTY_STATUS:
//     return {
//       ...state,
//       processing: true,
//     };

//   case actions.UPDATE_PROPERTY_STATUS_SUCCESFUL:
//     return {
//       ...state,
//       processing: false,
//       data: action.payload
//     };


//   /* Delete */
//   case actions.DELETE_PROPERTY:
//     return {
//       ...state,
//       processing: true,
//     };

//   case actions.DELETE_PROPERTY_SUCCESSFUL:
//     return {
//       ...state,
//       processing: false,
//       didFetch: false,
//       data: [],
//     };

//   default:
//     return state;
//   }
// }

// function getListSuccessful ( state: PropertyState, result: PropertyResponse ): PropertyState {
//   return {
//     ...state,
//     fetching: false,
//     didFetch: true,
//     data: result.data,
//     meta: result.meta,
//   };
// }

// function updateSuccessful ( state: any, result: any ): any {
//   const data = state.data.slice( 0 );
//   const index = data.findIndex( ( property: any ) => property.id === Number( result.id ) );
//   data.splice( index, 1, result );
//   return {
//     ...state,
//     processing: false,
//     data: data,
//   };
// }



export function propertyReducer (
  state: PropertyState = initialState,
  action: actions.Actions
): PropertyState {
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
    case actions.CREATE_PROPERTY:
      return {
        ...state,
        processing: true,
      };

    case actions.CREATE_PROPERTY_SUCCESFUL:
      return {
        ...state,
        didFetch: false,
        processing: false,
        data: [],
      };

    /* Update */
    case actions.UPDATE_PROPERTY:
      return {
        ...state,
        processing: true,
      };

    case actions.UPDATE_PROPERTY_SUCCESFUL:
      return updateSuccessful( state, action.payload );

    /* Toggle */
    case actions.UPDATE_PROPERTY_STATUS:
      return {
        ...state,
        processing: true,
      };

    case actions.UPDATE_PROPERTY_STATUS_SUCCESFUL:
      return updateSuccessful( state, action.payload );

    /* Delete */
    case actions.DELETE_PROPERTY:
      return {
        ...state,
        processing: true,
      };

    case actions.DELETE_PROPERTY_SUCCESSFUL:
      return {
        ...state,
        processing: false,
        didFetch: false,
        data: [],
      };

    // case actions.ADD_ERROR:
    //   return {
    //     ...state,
    //     fetching: false,
    //     processing: false,
    //   };
    case actions.CLEAR_DETAIL:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}

function getListSuccessful (
  state: PropertyState,
  result: PropertyResponse
): PropertyState {
  return {
    ...state,
    fetching: false,
    didFetch: true,
    data: result.data,
    meta: result.meta,
  };
}

function updateSuccessful ( state: PropertyState, result: Property ): PropertyState {
  const data = state.data.slice( 0 );
  const index = data.findIndex( ( item: Property ) => item.id === result.id );
  data.splice( index, 1, result );
  return {
    ...state,
    processing: false,
    data: data,
  };
}


