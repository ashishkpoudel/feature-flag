export interface IContainer {
  get<T>(anyClass: any): T;
}
