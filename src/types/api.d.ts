export interface ApiResponse<T = any> {
  code: number;
  message?: string;
  data: T;
}

export interface PageParams {
  pageNum: number;
  pageSize: number;
}

export interface PageResult<T = any> {
  list: T[];
  total: number;
}
