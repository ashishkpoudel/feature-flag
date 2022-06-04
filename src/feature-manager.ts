import 'reflect-metadata';
import { featureFlagStore } from './feature-flag.store';
import { DefaultFilter } from './filter/default.filter';
import { FEATURE_FILTER_METADATA } from './decorator/constants';
import { IFeatureFilterHandler } from './interface/feature-filter-handler.interface';
import { IFeature } from './interface/feature.interface';
import { containerProvider } from './container';

export class FeatureManager {
  constructor(private readonly environment: string) {}

  async isEnabled(feature: IFeature | string): Promise<boolean> {
    const featureName = typeof feature === 'string' ? feature : feature['name'];
    const featureFlagOptions = featureFlagStore.get(this.environment, featureName);

    if (!featureFlagOptions || !featureFlagOptions.enabled) {
      return false;
    }

    const filters = featureFlagOptions?.filters || [new DefaultFilter(true)];

    for (const filter of filters) {
      const filterHandler = Reflect.getMetadata(FEATURE_FILTER_METADATA, filter.constructor);
      const filterHandlerInstance = containerProvider.get<IFeatureFilterHandler>(filterHandler);
      const evaluatedResult = await filterHandlerInstance.evaluate(filter);
      if (evaluatedResult) return true;
    }

    return false;
  }
}
