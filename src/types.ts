import { IFeatureFilter } from './interface/feature-filter.interface';

export interface AnyClass<T> {
  new (...args: any[]): T;
}

export interface FeatureOptions {
  readonly enabled?: boolean;
  readonly filters?: readonly IFeatureFilter[];
}
