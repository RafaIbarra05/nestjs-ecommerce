export interface PaginationResult<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    hasNextPage?: boolean;
    hasPrevPage?: boolean;
  };
}
