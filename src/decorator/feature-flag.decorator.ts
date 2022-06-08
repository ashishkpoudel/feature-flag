import { featureFlagStore } from '../feature-flag.store';
import { IFeatureFilter } from '../interface/feature-filter.interface';

export function FeatureFlag(environment: string, enabled: boolean): ClassDecorator;
export function FeatureFlag(
  environment: string,
  filters: readonly IFeatureFilter[]
): ClassDecorator;

export function FeatureFlag(environment: string, value: unknown): ClassDecorator {
  return (target) => {
    if (typeof value === 'boolean') {
      featureFlagStore.set(environment, target.name, { enabled: value });
      return;
    }

    if (Array.isArray(value)) {
      featureFlagStore.set(environment, target.name, { enabled: true, filters: value });
      return;
    }
  };
}
