import { IFeature } from '../src/interface/feature.interface';
import { IFeatureFilter } from '../src/interface/feature-filter.interface';
import { FeatureFlag } from '../src/decorator/feature-flag.decorator';
import { FeatureManager } from '../src/feature-manager';
import { featureFlagStore } from '../src/feature-flag.store';
import { IFeatureFilterHandler } from '../src/interface/feature-filter-handler.interface';
import { FeatureFilterHandler } from '../src/decorator/feature-filter-handler.decorator';

describe('Feature Flag Filter', () => {
  beforeEach(() => {
    featureFlagStore.clear();
  });

  it('sample', async () => {
    const featureManager = new FeatureManager('production');

    class AlwaysFalseFilter implements IFeatureFilter {}

    @FeatureFilterHandler(AlwaysFalseFilter)
    class AlwaysFalseFilterHandler implements IFeatureFilterHandler<AlwaysFalseFilter> {
      async evaluate(filter: AlwaysFalseFilter): Promise<boolean> {
        return false;
      }
    }

    @FeatureFlag('production', { enabled: true, filters: [new AlwaysFalseFilter()] })
    class HostReport implements IFeature {}

    expect(await featureManager.isEnabled(HostReport.name)).toEqual(false);
  });
});
