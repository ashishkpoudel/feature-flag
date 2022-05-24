import { FeatureOptions } from 'src/types';

export class FeatureFlagStore {
  private readonly featureFlags = new Map<string, { [feature: string]: FeatureOptions }>();

  set(environment: string, feature: string, options: FeatureOptions) {
    const existingFeatureFlags = this.featureFlags.get(environment) || {};
    this.featureFlags.set(environment, {
      ...existingFeatureFlags,
      ...{ [feature]: options },
    });
  }

  get(environment: string, feature: string): FeatureOptions | undefined {
    return this.featureFlags.get(environment)?.[feature];
  }

  clear() {
    this.featureFlags.clear();
  }
}

const featureFlagStore = new FeatureFlagStore();

export { featureFlagStore };
