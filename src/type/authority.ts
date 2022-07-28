export interface LisInt {
  name: string;
  roleId: number;
  roleList?: LisInt[];
  viewRole?: string;
}

export class InitData {
  id: number;
  authorityId: number[];
  constructor(id: number, authorityId: number[]) {
    this.id = id;
    this.authorityId = authorityId;
  }
  list:LisInt[] = []
  treeRef:any
}
