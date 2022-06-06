import { AnyClass } from '../types';

export interface IContainer {
  get<T>(anyClass: AnyClass<T>, options?: Record<string, any>): T;
}
