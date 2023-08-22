export interface Get_Sms {
  id: string;
  title: string;
  template: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Create_Sms {
  title: string;
  template: string;
  status: boolean;
}

export interface Update_Sms {
  id: number;
  title: string;
  template: string;
  status: boolean;
}

export interface Update_Sms_Status {
  id: string;
  status: boolean;
}

export interface Delete_Sms {
  Ids: Array<number>;
}

export interface Filter {
  search?: string;
  order_by?: string;
  order_dir?: string;
  page: number;
  per_page: number;
}

export interface SMS {
  selected: boolean;
  id?: number;
  title: string;
  template: string;
  status: Number;
  createdAt: string;
  updatedAt: string;
}

export interface Link {
  first: string;
  last: string;
  prev: string;
  next: string;
}

export interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
}

/**
 * User List Response Interface
 */
export interface SMSResponse {
  data: Array<SMS>;
  links: Link;
  meta: Meta;
}
