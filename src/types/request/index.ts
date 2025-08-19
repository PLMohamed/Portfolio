export interface FilterRequest<T> {
  page?: number;
  limit?: number;
  sortBy?: keyof T;
  order?: "asc" | "desc";
}

export const DEFAULT_FILTER_REQUEST = {
  page: 1,
  limit: 10,
};
