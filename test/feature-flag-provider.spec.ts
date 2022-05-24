import { FeatureFlag } from 'src/decorator/feature-flag';
import { Feature } from 'src/interface/feature-flag';
import { FeatureFlagProvider } from 'src/feature-flag.provider';
import { featureFlagStore } from 'src/feature-flag.store';

describe('Feature Flag Provider', () => {
  beforeEach(() => {
    featureFlagStore.clear();
  });

  it('should return false when feature is not registered', () => {
    const featureFlagProvider = new FeatureFlagProvider('production');
    expect(featureFlagProvider.isEnabled('unknownFeature')).toEqual(false);
  });

  it('should return true if feature is enabled for specified environment', () => {
    @FeatureFlag('production', { enabled: true })
    class HostReport implements Feature {
      name = 'hostReport';
    }

    const featureFlagProvider = new FeatureFlagProvider('production');
    expect(featureFlagProvider.isEnabled('hostReport')).toEqual(true);
  });

  it('should return false if feature is disabled for specified environment', () => {
    @FeatureFlag('staging', { enabled: false })
    class CommunityManagerReport implements Feature {
      name = 'communityManagerReport';
    }

    const featureFlagProvider = new FeatureFlagProvider('staging');
    expect(featureFlagProvider.isEnabled('communityManagerReport')).toEqual(false);
  });
});
