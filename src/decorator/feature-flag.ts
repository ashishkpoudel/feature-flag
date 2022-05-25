import { FeatureOptions } from 'src/types';
import { featureFlagStore } from 'src/feature-flag.store';

export function FeatureFlag(environment: string, options: FeatureOptions): ClassDecorator {
  return (target) => {
    featureFlagStore.set(environment, target.name, options);
  };
}
