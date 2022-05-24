import { featureFlagStore } from 'src/feature-flag.store';

export class FeatureFlagProvider {
  constructor(private readonly environment: string) {}

  isEnabled(feature: string): boolean {
    const featureFlagOptions = featureFlagStore.get(this.environment, feature);
    return featureFlagOptions?.enabled || false;
  }
}
