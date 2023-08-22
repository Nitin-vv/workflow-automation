import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WorkflowState } from './workflow.state';

export const name = 'workflow';
export const workflowSelector = createFeatureSelector<WorkflowState>( name );

export const didFetchSelector = createSelector(
  workflowSelector,
  ( state: WorkflowState ) => state.didFetch
);

export const fetchingSelector = createSelector(
  workflowSelector,
  ( state: WorkflowState ) => state.fetching
);

export const processingSelector = createSelector(
  workflowSelector,
  ( state: WorkflowState ) => state.processing
);

export const dataSelector = createSelector(
  workflowSelector,
  ( state: WorkflowState ) => state.data
);

export const filterSelector = createSelector(
  workflowSelector,
  ( state: WorkflowState ) => state.filter
);

export const metaSelector = createSelector(
  workflowSelector,
  ( state: WorkflowState ) => state.meta
);
