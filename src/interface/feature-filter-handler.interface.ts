import { IFeatureFilter } from './feature-filter.interface';

export interface IFeatureFilterHandler<TFilter extends IFeatureFilter, TContext extends any = any> {
  evaluate(filter: TFilter, context?: TContext): Promise<boolean>;
}
