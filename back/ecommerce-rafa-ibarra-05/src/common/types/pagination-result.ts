export interface PaginationResult<T> {
  page: number;
  limit: number;
  total: number;
  data: T[];
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
}
