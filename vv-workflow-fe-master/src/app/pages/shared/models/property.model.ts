export interface Get_Property {
  id: number;
  title: string;
  type: string;
  status: boolean;
  regex: string;
  createdAt: string;
  updatedAt: string;
}

export interface Create_Property {
  title: string;
  type: string;
  status: boolean;
  regex: string;
}

export interface Update_Property {
  id: number;
  title: string;
  status: boolean;
  type: string;
  regex: string;
}

export interface Update_Property_Status {
  id: number;
  status: boolean;
}

export interface Delete_Property {
  id: Array<any>;
}

export interface Filter {
  search?: string;
  order_by?: string;
  order_dir?: string;
  page: number;
  per_page: number;
}

export interface Property {
  selected: boolean;
  id?: number;
  title: string;
  type: Number;
  status: Number;
  regex: string;
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
export interface PropertyResponse {
  data: Array<Property>;
  links: Link;
  meta: Meta;
}
