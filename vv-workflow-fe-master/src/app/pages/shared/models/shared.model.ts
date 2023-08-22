export interface PropertyInterface {
  id?: number;
  title: string;
  propertytype: Number;
  status: Number;
  regex: string;
  createdAt: string;
  updatedAt: string;
}

export interface TablePagination {
  length: number;
  pageIndex: number;
  pageSize: number;
  previousPageIndex: number;
}

export interface Filter {
  search?: string;
  order_by?: string;
  order_dir?: string;
  page: number;
  per_page: number;
}

export interface TablePagination {
  length: number;
  pageIndex: number;
  pageSize: number;
  previousPageIndex: number;
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
