export interface IPagination<T> {
  pages: IPage<T>;
  previous: string;
  next: string;
  total_count: number;
  total_pages: number;
}

interface IPage<T> {
  active: T;
  after_distance: T;
  after_near: T;
  before_distance: T;
  before_near: T;
  first: T;
  last: T;
}
