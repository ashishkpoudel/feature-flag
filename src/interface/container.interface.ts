import { Class } from '../types';

export interface IContainer {
  get<T>(anyClass: Class<T>, options?: Record<string, any>): T;
}
