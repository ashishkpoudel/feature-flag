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

  it('should be disabled when filter resolves to false', async () => {
    const featureManager = new FeatureManager('production');

    class DefaultFilter implements IFeatureFilter {
      constructor(readonly value: boolean) {}
    }

    @FeatureFilterHandler(DefaultFilter)
    class _DefaultFilterHandler implements IFeatureFilterHandler<DefaultFilter> {
      async evaluate(_filter: DefaultFilter): Promise<boolean> {
        return _filter.value;
      }
    }

    @FeatureFlag('production', {
      enabled: true,
      filters: [new DefaultFilter(false)],
    })
    class HostReport implements IFeature {}

    expect(await featureManager.isEnabled(HostReport.name)).toEqual(false);
  });
});
