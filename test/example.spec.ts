import {FeatureFlag} from 'src/decorator/feature-flag';
import {featureFlagStore} from 'src/feature-flag.store';
import {Feature} from 'src/interface/feature-flag';

describe('Example Test', () => {
  it('Passes', () => {
    @FeatureFlag('production', {enabled: false})
    @FeatureFlag('staging', {enabled: true})
    class HostCommission implements Feature {
      name = 'hostCommission';
    }

    console.log(featureFlagStore.featureFlags);

    expect(true).toEqual(true);
  });

  it('Another Passes', () => {
    console.log(featureFlagStore.featureFlags);

    @FeatureFlag('production', {enabled: false})
    class BrandCommission implements Feature {
      name = 'brandCommission';
    }

    console.log(featureFlagStore.featureFlags);

    expect(true).toEqual(true);
  });
});
