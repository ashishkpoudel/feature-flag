import {Environment, Feature, FeatureOptions} from 'src/types';

export class FeatureFlagMap {
  readonly value = new Map<Environment, {[feature: Feature]: FeatureOptions}>();

  set(environment: Environment, featureOptions: {[feature: Feature]: FeatureOptions}) {
    if (this.value.has(environment)) {
      this.value.set(environment, {...this.value.get(environment), ...featureOptions});
      return;
    }

    this.value.set(environment, featureOptions);
  }

  clear() {
    this.value.clear();
  }
}

const featureFlagMap = new FeatureFlagMap();

export {featureFlagMap};
