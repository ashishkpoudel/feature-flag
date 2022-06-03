import { IFeatureFilter } from './feature-filter.interface';

export interface IFeatureFilterHandler<T extends IFeatureFilter = IFeatureFilter> {
  evaluate(filter: T): Promise<boolean>;
}
