export type Scalars = {
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  JSON: any;
  Date: any;
  Time: any;
};

export interface ITodo {
  title: string;
  isCompleted: boolean;
  createdAt: Scalars["DateTime"];
}

export interface ITodoStore {
  todos: ITodo[];
  visibilityFilter: string;
}
export interface ISnapShoot {
  todos: ITodoStore;
}
export type AppState = {
  past: ISnapShoot[]
  present: ISnapShoot;
  future: ISnapShoot[];
};
