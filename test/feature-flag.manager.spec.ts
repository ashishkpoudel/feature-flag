import { IFeature } from '../src/interface/feature.interface';
import { FeatureFlag } from '../src/decorator/feature-flag.decorator';
import { FeatureManager } from '../src/feature-manager';
import { featureFlagStore } from '../src/feature-flag.store';

describe('Feature Flag Manager', () => {
  beforeEach(() => {
    featureFlagStore.clear();
  });

  it('feature should be disabled when feature is not registered', async () => {
    const featureManager = new FeatureManager('production');
    expect(await featureManager.isEnabled('UnknownFeature')).toEqual(false);
  });

  it('feature should be disabled when default value is false', async () => {
    const featureManager = new FeatureManager('production');

    @FeatureFlag('production', { enabled: false })
    class HostReport implements IFeature {}

    expect(await featureManager.isEnabled(HostReport)).toEqual(false);
  });

  it('feature should be enabled when default value is true', async () => {
    const featureManager = new FeatureManager('production');

    @FeatureFlag('production', { enabled: true })
    class HostReport implements IFeature {}

    expect(await featureManager.isEnabled(HostReport)).toEqual(true);
  });
});
