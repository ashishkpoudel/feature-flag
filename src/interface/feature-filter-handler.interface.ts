import { IFeatureFilter } from './feature-filter.interface';
import { IFeatureContext } from './feature-context.interface';

export interface IFeatureFilterHandler<
  TFilter extends IFeatureFilter,
  TContext extends IFeatureContext
> {
  evaluate(filter: TFilter, context?: TContext): Promise<boolean>;
}
