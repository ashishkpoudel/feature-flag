import { IStrategy } from './interface/strategy.interface';

export interface AnyClass<T> {
  new (...args: any[]): T;
}

export interface FeatureOptions {
  readonly enabled: boolean;
  readonly strategies?: readonly IStrategy[];
}
