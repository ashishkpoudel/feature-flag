import {FeatureOptions} from 'src/types';
import {featureFlagMap} from 'src/feature-flag-map';

type Constructor = {new (...args: any[]): any};

export function FeatureFlag(environment: string, options: FeatureOptions): ClassDecorator {
  return <T extends Constructor>(target) => {
    const featureFlag = new (class extends target {})();

    if (!featureFlag.name) {
      throw new Error('Feature must have a name set');
    }

    featureFlagMap.set(environment, {
      [target.name]: options,
    });
  };
}
