import { IFeatureFilter } from 'src/interface/feature-filter.interface';

export interface IFeatureFilterHandler<T extends IFeatureFilter = IFeatureFilter> {
  evaluate(filter: T): Promise<boolean>;
}
