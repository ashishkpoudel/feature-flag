import { IFeatureFilter } from './interface/feature-filter.interface';

export interface Class<T> {
  new (...args: any[]): T;
}

export interface FeatureOptions {
  readonly enabled: boolean;
  readonly filters?: readonly IFeatureFilter[];
}
