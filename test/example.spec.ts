import {FeatureFlag} from 'src/decorator/feature-flag';
import {featureFlagMap} from 'src/feature-flag-map';
import {Feature} from 'src/interface/feature-flag';

describe('Example Test', () => {
  it('Passes', () => {
    @FeatureFlag('production', {enabled: false})
    @FeatureFlag('staging', {enabled: true})
    class HostCommission implements Feature {
      name = 'hostCommission';
    }

    console.log(featureFlagMap.value);

    expect(true).toEqual(true);
  });

  it('Another Passes', () => {
    console.log(featureFlagMap.value);

    @FeatureFlag('production', {enabled: false})
    class BrandCommission implements Feature {
      name = 'brandCommission';
    }

    console.log(featureFlagMap.value);

    expect(true).toEqual(true);
  });
});
