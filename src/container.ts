import { IContainer } from 'src/interface/container.interface';
import { Class } from './types';

export class Container implements IContainer {
  get<T>(anyClass: Class<T>, ...args: any[]): T {
    return new anyClass(...args);
  }
}
