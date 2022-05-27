import { Feature } from 'src/interface/feature-flag';
import { FeatureFlag } from 'src/decorator/feature-flag';
import { FeatureManager } from 'src/feature-manager';
import { featureFlagStore } from 'src/feature-flag.store';

describe('Feature Flag Manager', () => {
  beforeEach(() => {
    featureFlagStore.clear();
  });

  it('should return false when feature is not registered', async () => {
    const featureManager = new FeatureManager('production');
    expect(await featureManager.isEnabled('UnknownFeature')).toEqual(false);
  });

  it('should return true if feature is enabled for specified environment', async () => {
    @FeatureFlag('production', { enabled: true })
    class HostReport implements Feature {}

    const featureManager = new FeatureManager('production');
    expect(await featureManager.isEnabled(HostReport.name)).toEqual(true);
  });

  it('should return false if feature is disabled for specified environment', async () => {
    @FeatureFlag('staging', { enabled: false })
    class CommunityManagerReport implements Feature {}

    const featureManager = new FeatureManager('staging');
    expect(await featureManager.isEnabled(CommunityManagerReport.name)).toEqual(false);
  });
});
