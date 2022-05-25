import { FeatureFlagStore, featureFlagStore } from 'src/feature-flag.store';
import { Feature } from 'src/interface/feature-flag';

export class FeatureManager {
  constructor(private readonly environment: string) {}

  isEnabled(feature: string): boolean {
    const featureFlagOptions = featureFlagStore.get(this.environment, feature);
    return featureFlagOptions?.enabled || false;
  }
}
