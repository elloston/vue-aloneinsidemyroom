interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: PaginationLink[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

interface PaginatedResponse<T> {
  data: T[];
  links: { next: string | null };
  meta: PaginationMeta;
}
