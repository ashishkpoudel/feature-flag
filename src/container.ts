import { IContainer } from './interface/container.interface';
import { Class } from './types';

export class Container implements IContainer {
  get<T>(anyClass: Class<T>): T {
    return new anyClass();
  }
}
