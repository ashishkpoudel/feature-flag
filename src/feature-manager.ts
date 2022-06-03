import 'reflect-metadata';
import { featureFlagStore } from './feature-flag.store';
import { DefaultFilter } from './filter/default.filter';
import { FEATURE_FILTER_METADATA } from './decorator/constants';
import { IFeatureFilterHandler } from './interface/feature-filter-handler.interface';
import { IFeature } from './interface/feature.interface';
import { IContainer } from './interface/container.interface';
import { Container } from './container';

export class FeatureManager {
  private readonly container: IContainer;

  constructor(
    private readonly environment: string,
    private readonly options?: Partial<{
      container: IContainer;
    }>
  ) {
    this.container = this?.options?.container ?? new Container();
  }

  async isEnabled(feature: IFeature | string): Promise<boolean> {
    const featureName = typeof feature === 'string' ? feature : feature['name'];
    const featureFlagOptions = featureFlagStore.get(this.environment, featureName);

    if (!featureFlagOptions || !featureFlagOptions.enabled) {
      return false;
    }

    const filters = featureFlagOptions?.filters || [new DefaultFilter(true)];

    const pEvaluatedResult = filters.map(async (filter) => {
      const filterHandler = Reflect.getMetadata(FEATURE_FILTER_METADATA, filter.constructor);
      const filterHandlerInstance = this.container.get<IFeatureFilterHandler>(filterHandler);
      return filterHandlerInstance.evaluate(filter);
    });

    return (await Promise.all(pEvaluatedResult)).includes(true);
  }
}
