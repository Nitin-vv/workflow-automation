import { Email } from '../../shared/models/email.model';
import * as commonModels from '../../shared/models/shared.model';
import { SMS } from '../../shared/models/sms.model';

export interface EmailState {
  fetching: boolean;
  didFetch: boolean;
  processing: boolean;
  data: Array<Email>;
  filter: commonModels.Filter;
  meta: commonModels.Meta;
}

export const initialState: EmailState = {
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
