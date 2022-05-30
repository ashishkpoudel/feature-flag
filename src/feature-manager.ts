import { featureFlagStore } from './feature-flag.store';

export class FeatureManager {
  constructor(private readonly environment: string) {}

  async isEnabled(feature: string): Promise<boolean> {
    const featureFlagOptions = featureFlagStore.get(this.environment, feature);
    if (!featureFlagOptions || !featureFlagOptions.enabled) return false;

    const filters = featureFlagOptions?.filters || [];
    const filterResult = await Promise.all(
      filters.map((filter) => {
        return filter.evaluate();
      })
    );

    return !filterResult.includes(false);
  }
}
