import { featureFlagStore } from '../feature-flag.store';
import { IStrategy } from '../interface/strategy.interface';

export function FeatureFlag(environment: string, enabled: boolean): ClassDecorator;
export function FeatureFlag(environment: string, strategies: readonly IStrategy[]): ClassDecorator;

export function FeatureFlag(environment: string, value: unknown): ClassDecorator {
  return (target) => {
    if (typeof value === 'boolean') {
      featureFlagStore.set(environment, target.name, { enabled: value });
      return;
    }

    if (Array.isArray(value)) {
      featureFlagStore.set(environment, target.name, { enabled: true, strategies: value });
      return;
    }
  };
}
