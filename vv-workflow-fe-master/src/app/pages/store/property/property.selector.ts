import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PropertyState } from './property.state';

export const name = 'property';
export const propertySelector = createFeatureSelector<PropertyState>( name );

export const didFetchSelector = createSelector(
  propertySelector,
  ( state: PropertyState ) => state.didFetch
);

export const fetchingSelector = createSelector(
  propertySelector,
  ( state: PropertyState ) => state.fetching
);

export const processingSelector = createSelector(
  propertySelector,
  ( state: PropertyState ) => state.processing
);

export const dataSelector = createSelector(
  propertySelector,
  ( state: PropertyState ) => state.data
);

export const filterSelector = createSelector(
  propertySelector,
  ( state: PropertyState ) => state.filter
);

export const metaSelector = createSelector(
  propertySelector,
  ( state: PropertyState ) => state.meta
);
