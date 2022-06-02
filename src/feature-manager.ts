import 'reflect-metadata';
import { featureFlagStore } from './feature-flag.store';
import { DefaultFilter } from './filter/default.filter';
import { FEATURE_FILTER_METADATA } from 'src/decorator/constants';
import { IFeatureFilterHandler } from 'src/interface/feature-filter-handler.interface';

export class FeatureManager {
  constructor(private readonly environment: string) {}

  async isEnabled(feature: string): Promise<boolean> {
    const featureFlagOptions = featureFlagStore.get(this.environment, feature);

    if (!featureFlagOptions || !featureFlagOptions.enabled) {
      return false;
    }

    const filters = featureFlagOptions?.filters || [new DefaultFilter(true)];

    const pEvaluatedResult = filters.map(async (filter) => {
      const filterHandler = Reflect.getMetadata(FEATURE_FILTER_METADATA, filter.constructor);
      return (new filterHandler() as IFeatureFilterHandler).evaluate(filter);
    });

    return (await Promise.all(pEvaluatedResult)).includes(true);
  }
}
