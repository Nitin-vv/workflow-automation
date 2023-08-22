export interface Get_Email {
  id: string;
  title: string;
  subject: string;
  body: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Create_Email {
  title: string;
  subject: string;
  body: string;
  status: boolean;
}

export interface Update_Email {
  id: number;
  title: string;
  subject: string;
  body: string;
  status: boolean;
}

export interface Update_Email_Status {
  id: string;
  status: boolean;
}

export interface Delete_Email {
  Ids: Array<number>;
}

export interface Filter {
  search?: string;
  order_by?: string;
  order_dir?: string;
  page: number;
  per_page: number;
}

export interface Email {
  selected: boolean;
  id?: number;
  title: string;
  subject: string;
  body: string;
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
export interface EmailResponse {
  data: Array<Email>;
  links: Link;
  meta: Meta;
}
