import { Workflow } from '../../shared/models/workflow.model';
import * as commonModels from '../../shared/models/shared.model';
import { PropertyInterface } from '../../shared/models/shared.model';

export interface WorkflowState {
  fetching: boolean;
  didFetch: boolean;
  processing: boolean;
  data: Array<Workflow>;
  filter: commonModels.Filter;
  meta: commonModels.Meta;
}

export const initialState: WorkflowState = {
  fetching: false,
  didFetch: false,
  processing: false,
  data: [],
  filter: {
    search: '',
    order_by: 'createdAt',
    order_dir: 'desc',
    page: 1,
    per_page: 10,
  },
  meta: {
    current_page: 1,
    from: 1,
    last_page: 0,
    path: '',
    per_page: 0,
    to: 0,
    total: 0,
  },
};
