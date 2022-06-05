import 'reflect-metadata';
import { featureFlagStore } from './feature-flag.store';
import { FEATURE_FILTER_METADATA } from './decorator/constants';
import { IFeatureFilterHandler } from './interface/feature-filter-handler.interface';
import { IFeature } from './interface/feature.interface';
import { IFeatureFilter } from './interface/feature-filter.interface';
import { containerProvider } from './container';

export class FeatureManager {
  constructor(private readonly environment: string) {}

  with() {
    return this;
  }

  async isEnabled(feature: IFeature | string, filters: readonly IFeatureFilter[] = []): Promise<boolean> {
    const featureName = typeof feature === 'string' ? feature : feature['name'];
    const featureFlagOptions = featureFlagStore.get(this.environment, featureName);

    if (!featureFlagOptions || !featureFlagOptions.enabled) {
      return false;
    }

    const allFilters = [...(featureFlagOptions?.filters || [])];

    for (const filter of filters) {
      const filterHandler = Reflect.getMetadata(FEATURE_FILTER_METADATA, filter.constructor);
      const filterHandlerInstance = containerProvider
        .resolveContainer()
        .get<IFeatureFilterHandler>(filterHandler);

      const evaluatedResult = await filterHandlerInstance.evaluate(filter);
      if (evaluatedResult) return true;
    }

    return featureFlagOptions.enabled;
  }
}
