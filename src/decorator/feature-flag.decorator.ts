import { FeatureOptions } from '../types';
import { featureFlagStore } from '../feature-flag.store';

export function FeatureFlag(environment: string, options: FeatureOptions): ClassDecorator {
  return (target) => {
    featureFlagStore.set(environment, target.name, options);
  };
}
