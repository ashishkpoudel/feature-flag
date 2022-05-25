import { FeatureFlag } from 'src/decorator/feature-flag';
import { Feature } from 'src/interface/feature-flag';
import { FeatureManager } from 'src/feature-manager';
import { featureFlagStore } from 'src/feature-flag.store';

describe('Feature Flag Manager', () => {
  beforeEach(() => {
    featureFlagStore.clear();
  });

  it('should return false when feature is not registered', () => {
    const featureManager = new FeatureManager('production');
    expect(featureManager.isEnabled('UnknownFeature')).toEqual(false);
  });

  it('should return true if feature is enabled for specified environment', () => {
    @FeatureFlag('production', { enabled: true })
    class HostReport implements Feature {}

    const featureManager = new FeatureManager('production');
    expect(featureManager.isEnabled('HostReport')).toEqual(true);
  });

  it('should return false if feature is disabled for specified environment', () => {
    @FeatureFlag('staging', { enabled: false })
    class CommunityManagerReport implements Feature {}

    const featureManager = new FeatureManager('staging');
    expect(featureManager.isEnabled('CommunityManagerReport')).toEqual(false);
  });
});
