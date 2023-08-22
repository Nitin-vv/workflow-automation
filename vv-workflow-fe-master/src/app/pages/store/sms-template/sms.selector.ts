import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SMSState } from './sms.state';

export const name = 'sms';
export const smsSelector = createFeatureSelector<SMSState>( name );

export const didFetchSelector = createSelector(
  smsSelector,
  ( state: SMSState ) => state.didFetch
);

export const fetchingSelector = createSelector(
  smsSelector,
  ( state: SMSState ) => state.fetching
);

export const processingSelector = createSelector(
  smsSelector,
  ( state: SMSState ) => state.processing
);

export const dataSelector = createSelector(
  smsSelector,
  ( state: SMSState ) => state.data
);

export const filterSelector = createSelector(
  smsSelector,
  ( state: SMSState ) => state.filter
);

export const metaSelector = createSelector(
  smsSelector,
  ( state: SMSState ) => state.meta
);
