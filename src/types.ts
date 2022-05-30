import { FeatureFilter } from './interface/feature-filter';

export interface FeatureOptions {
  readonly enabled: boolean;
  readonly filters?: readonly FeatureFilter[];
}
