// import { Profile } from 'app/shared/models/user.model';

export interface AuthenticationState {
  fetching: boolean;
  didFetch: boolean;
  processing: boolean;
  data: any;
}

export const initialState: AuthenticationState = {
  didFetch: false,
  fetching: false,
  processing: false,
  data: {
    id: null,
    name: '',
    email: '',
    createdAt: '',
    updatedAt: '',
  },
};
