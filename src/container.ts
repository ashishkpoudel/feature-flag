import { IContainer } from './interface/container.interface';
import { Class } from './types';

class DefaultContainer implements IContainer {
  get<T>(anyClass: Class<T>): T {
    return new anyClass();
  }
}

export class ContainerProvider {
  constructor(private _container = new DefaultContainer()) {}

  get<T>(anyClass: Class<T>): T {
    return this._container.get<T>(anyClass);
  }

  useContainer(container: IContainer) {
    this._container = container;
  }
}

const containerProvider = new ContainerProvider();

export { containerProvider };
