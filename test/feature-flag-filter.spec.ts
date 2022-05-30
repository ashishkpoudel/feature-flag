import { Feature } from '../src/interface/feature-flag';
import { FeatureFilter } from '../src/interface/feature-filter';
import { FeatureFlag } from '../src/decorator/feature-flag';
import { FeatureManager } from '../src/feature-manager';
import { featureFlagStore } from '../src/feature-flag.store';

describe('Feature Flag Filter', () => {
  beforeEach(() => {
    featureFlagStore.clear();
  });

  it('sample', async () => {
    const featureManager = new FeatureManager('production');

    class AlwaysFalseFilter implements FeatureFilter {
      async evaluate() {
        return false;
      }
    }

    @FeatureFlag('production', { enabled: true, filters: [new AlwaysFalseFilter()] })
    class HostReport implements Feature {}

    expect(await featureManager.isEnabled(HostReport.name)).toEqual(false);
  });
});
