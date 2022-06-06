import { IContainer } from './interface/container.interface';
import { AnyClass } from './types';

class DefaultContainer implements IContainer {
  get<T>(anyClass: AnyClass<T>): T {
    return new anyClass();
  }
}

class ContainerProvider {
  constructor(private container = new DefaultContainer()) {}

  resolveContainer() {
    return this.container;
  }

  useContainer(container: IContainer) {
    this.container = container;
  }
}

const containerProvider = new ContainerProvider();

export { containerProvider };
