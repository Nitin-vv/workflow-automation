export interface Get_Workflow {
  id: number;
  title: string;
  workflow: any;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Create_Workflow {
  title: string;
  workflow: any;
  status: boolean;
}

export interface Update_Workflow {
  id: number;
  title: string;
  status: boolean;
  workflow: any;
}

export interface Update_Workflow_Status {
  id: number;
  status: boolean;
}

export interface Delete_Workflow {
  id: Array<any>;
}

export interface Filter {
  search?: string;
  order_by?: string;
  order_dir?: string;
  page: number;
  per_page: number;
}

export interface Workflow {
  selected: boolean;
  id?: number;
  title: string;
  workflow: any;
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
export interface workflowResponse {
  data: Array<Workflow>;
  links: Link;
  meta: Meta;
}
