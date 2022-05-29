import { featureFlagStore } from './feature-flag.store';

export class FeatureManager {
  constructor(private readonly environment: string) {}

  async isEnabled(feature: string): Promise<boolean> {
    const featureFlagOptions = featureFlagStore.get(this.environment, feature);
    return featureFlagOptions?.enabled || false;
  }
}
