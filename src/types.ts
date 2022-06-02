import { IFeatureFilter } from 'src/interface/feature-filter.interface';

export interface FeatureOptions {
  readonly enabled: boolean;
  readonly filters?: readonly IFeatureFilter[];
}
