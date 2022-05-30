import { featureFlagStore } from './feature-flag.store';
import { DefaultFilter } from './filter/default.filter';

export class FeatureManager {
  constructor(private readonly environment: string) {}

  async isEnabled(feature: string): Promise<boolean> {
    const featureFlagOptions = featureFlagStore.get(this.environment, feature);

    if (!featureFlagOptions || !featureFlagOptions.enabled) {
      return false;
    }

    const filters = featureFlagOptions?.filters || [new DefaultFilter(true)];
    const evaluatedFilters = await Promise.all(filters.map((filter) => filter.evaluate()));

    return evaluatedFilters.includes(true);
  }
}
