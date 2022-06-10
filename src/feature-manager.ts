import 'reflect-metadata';
import { featureFlagStore } from './feature-flag.store';
import { FEATURE_FILTER_METADATA } from './decorator/constants';
import { IStrategyHandler } from './interface/strategy-handler.interface';
import { IFeature } from './interface/feature.interface';
import { IStrategy } from './interface/strategy.interface';
import { containerProvider } from './container';

export class FeatureManager {
  constructor(private readonly environment: string) {}

  async isEnabled<TContext extends object>(
    feature: IFeature | string,
    context?: TContext
  ): Promise<boolean> {
    const featureName = typeof feature === 'string' ? feature : feature['name'];
    const featureFlagOptions = featureFlagStore.get(this.environment, featureName);

    if (!featureFlagOptions || !featureFlagOptions.enabled) {
      return false;
    }

    const strategies = featureFlagOptions?.strategies || [];

    for (const strategy of strategies) {
      const filterHandler = Reflect.getMetadata(FEATURE_FILTER_METADATA, strategy.constructor);
      const filterHandlerInstance = containerProvider
        .resolveContainer()
        .get<IStrategyHandler<IStrategy>>(filterHandler);

      const evaluatedResult = await filterHandlerInstance.evaluate(strategy, context);
      if (evaluatedResult) return true;
    }

    return !strategies.length;
  }
}
