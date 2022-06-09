import 'reflect-metadata';
import { featureFlagStore } from './feature-flag.store';
import { FEATURE_FILTER_METADATA } from './decorator/constants';
import { IFeatureFilterHandler } from './interface/feature-filter-handler.interface';
import { IFeature } from './interface/feature.interface';
import { IFeatureFilter } from './interface/feature-filter.interface';
import { containerProvider } from './container';

export class FeatureManager {
  constructor(private readonly environment: string) {}

  async isEnabled<TContext extends object>(
    feature: IFeature | string,
    context?: TContext
  ): Promise<boolean> {
    const featureName = typeof feature === 'string' ? feature : feature['name'];
    const featureFlagOptions = featureFlagStore.get(this.environment, featureName);

    if (!featureFlagOptions || !featureFlagOptions.enabled) {
      return false;
    }

    const allFilters = featureFlagOptions?.filters || [];

    for (const filter of allFilters) {
      const filterHandler = Reflect.getMetadata(FEATURE_FILTER_METADATA, filter.constructor);
      const filterHandlerInstance = containerProvider
        .resolveContainer()
        .get<IFeatureFilterHandler<IFeatureFilter>>(filterHandler);

      const evaluatedResult = await filterHandlerInstance.evaluate(filter, context);
      if (evaluatedResult) return true;
    }

    return !allFilters.length;
  }
}
