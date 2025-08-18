export interface PaginationData<T> {
  data: T;
  total: number;
  totalPages: number;
  currentPage: number;
}
