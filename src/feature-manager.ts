import 'reflect-metadata';
import { featureFlagStore } from './feature-flag.store';
import { FEATURE_FILTER_METADATA } from './decorator/constants';
import { IFeatureFilterHandler } from './interface/feature-filter-handler.interface';
import { IFeature } from './interface/feature.interface';
import { IFeatureFilter } from './interface/feature-filter.interface';
import { containerProvider } from './container';

enum EvaluationStatus {
  ENABLED = 'enabled',
  DISABLED = 'disabled',
}

export class FeatureManager {
  constructor(private readonly environment: string) {}

  async evaluate(
    feature: IFeature | string,
    filters: readonly IFeatureFilter[] = []
  ): Promise<FeatureManagerResult> {
    const featureName = typeof feature === 'string' ? feature : feature['name'];
    const featureFlagOptions = featureFlagStore.get(this.environment, featureName);

    if (!featureFlagOptions || !featureFlagOptions.enabled) {
      return new FeatureManagerResult(EvaluationStatus.DISABLED);
    }

    const allFilters = [...(featureFlagOptions?.filters || []), ...filters];

    for (const filter of allFilters) {
      const filterHandler = Reflect.getMetadata(FEATURE_FILTER_METADATA, filter.constructor);
      const filterHandlerInstance = containerProvider
        .resolveContainer()
        .get<IFeatureFilterHandler>(filterHandler);

      const evaluatedResult = await filterHandlerInstance.evaluate(filter);
      if (evaluatedResult) return new FeatureManagerResult(EvaluationStatus.ENABLED);
    }

    return new FeatureManagerResult(EvaluationStatus.ENABLED);
  }
}

class FeatureManagerResult {
  constructor(private readonly status: EvaluationStatus) {}

  get enabled() {
    return EvaluationStatus.ENABLED === this.status;
  }
}
