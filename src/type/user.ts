export interface ListInt {
  id: number;
  nickName: string;
  role: RoleInt[];
  userName: string;
}
interface RoleInt {
  role: number;
  roleName: string;
}
interface searchData {
  role: number;
  nickName: string;
}
export interface RoleListInt {
  authority: number[];
  roleId: number;
  roleName: string;
}
interface Active {
  id: number;
  nickName: string;
  role: number[];
  userName: string;
}
export class InitData {
  searchData: searchData = {
    nickName: "",
    role: 0,
  };
  list: ListInt[] = [];
  roleList: RoleListInt[] = [];
  isShow = false;
  active: Active = {
    id: 0,
    nickName: "",
    role: [],
    userName: "",
  };
}
