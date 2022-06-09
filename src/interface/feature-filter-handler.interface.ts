import { IFeatureFilter } from './feature-filter.interface';

export interface IFeatureFilterHandler<TFilter extends IFeatureFilter, TContext extends object> {
  evaluate(filter: TFilter, context?: TContext): Promise<boolean>;
}
