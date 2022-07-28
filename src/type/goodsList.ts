export interface ListInt {
  userId: number;
  id: number;
  title: string;
  introduce: string;
}
interface searchDataInt {
  title: string;
  introduce: string;
  page: number;
  count: number;
  pageSize: number;
}
export class InitgoodsList {
  list: ListInt[] = [];
  searchData: searchDataInt = {
    title: '',
    introduce: '',
    page: 1,
    count: 0,
    pageSize: 8,
  };
}
