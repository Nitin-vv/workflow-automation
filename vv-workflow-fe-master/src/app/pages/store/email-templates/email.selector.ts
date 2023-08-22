import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EmailState } from './email.state';

export const name = 'email';
export const emailSelector = createFeatureSelector<EmailState>( name );

export const didFetchSelector = createSelector(
  emailSelector,
  ( state: EmailState ) => state.didFetch
);

export const fetchingSelector = createSelector(
  emailSelector,
  ( state: EmailState ) => state.fetching
);

export const processingSelector = createSelector(
  emailSelector,
  ( state: EmailState ) => state.processing
);

export const dataSelector = createSelector(
  emailSelector,
  ( state: EmailState ) => state.data
);

export const filterSelector = createSelector(
  emailSelector,
  ( state: EmailState ) => state.filter
);

export const metaSelector = createSelector(
  emailSelector,
  ( state: EmailState ) => state.meta
);
