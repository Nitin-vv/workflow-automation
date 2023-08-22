import { Property } from '../../shared/models/property.model';
import * as commonModels from '../../shared/models/shared.model';
import { PropertyInterface } from '../../shared/models/shared.model';

// export interface PropertyState {
//   fetching: boolean;
//   didFetch: boolean;
//   processing: boolean;
//   data: Array<PropertyInterface>;
//   filter: commonModels.Filter;
//   meta: commonModels.Meta;
// }

// export const initialState: PropertyState = {
//   didFetch: false,
//   fetching: false,
//   processing: false,
//   data: [],
//   filter: {
//     search: '',
//     order_by: 'createdAt',
//     order_dir: 'desc',
//     page: 1,
//     per_page: 20,
//   },
//   meta: {
//     current_page: 1,
//     from: 1,
//     last_page: 0,
//     path: '',
//     per_page: 0,
//     to: 0,
//     total: 0,
//   },
// };

export interface PropertyState {
  fetching: boolean;
  didFetch: boolean;
  processing: boolean;
  data: Array<Property>;
  filter: commonModels.Filter;
  meta: commonModels.Meta;
}

export const initialState: PropertyState = {
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
