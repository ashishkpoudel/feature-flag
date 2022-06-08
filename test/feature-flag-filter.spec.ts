import { IFeature } from '../src/interface/feature.interface';
import { IFeatureFilter } from '../src/interface/feature-filter.interface';
import { FeatureFlag } from '../src/decorator/feature-flag.decorator';
import { FeatureManager } from '../src/feature-manager';
import { featureFlagStore } from '../src/feature-flag.store';
import { IFeatureFilterHandler } from '../src/interface/feature-filter-handler.interface';
import { FeatureFilterHandler } from '../src/decorator/feature-filter-handler.decorator';

describe('Feature Flag Filter', () => {
  class GenericFilter implements IFeatureFilter {
    constructor(readonly value: boolean) {}
  }

  @FeatureFilterHandler(GenericFilter)
  class _GenericFilterHandler implements IFeatureFilterHandler<GenericFilter> {
    async evaluate(_filter: GenericFilter): Promise<boolean> {
      return _filter.value;
    }
  }

  beforeEach(() => {
    featureFlagStore.clear();
  });

  it('feature should be disabled if filters does not resolves to true', async () => {
    const featureManager = new FeatureManager('production');

    @FeatureFlag('production', [new GenericFilter(false)])
    class HostReport implements IFeature {}

    expect(await featureManager.isEnabled(HostReport)).toEqual(false);
  });

  it('feature should be enabled when one of the filter evaluates to true', async () => {
    const featureManager = new FeatureManager('production');

    @FeatureFlag('production', [
      new GenericFilter(false),
      new GenericFilter(true),
      new GenericFilter(false),
    ])
    class HostReport implements IFeature {}

    expect(await featureManager.isEnabled(HostReport)).toEqual(true);
  });

  it('feature filters can be added right before evaluation', async () => {
    const featureManager = new FeatureManager('production');

    @FeatureFlag('production', [new GenericFilter(false)])
    class HostReport implements IFeature {}

    expect(await featureManager.isEnabled(HostReport, [new GenericFilter(true)])).toEqual(true);
  });

  it('feature with default value false will not evaluate filters added right before evaluation', async () => {
    const featureManager = new FeatureManager('production');

    @FeatureFlag('production', false)
    class HostReport implements IFeature {}

    expect(await featureManager.isEnabled(HostReport, [new GenericFilter(true)])).toEqual(false);
  });
});
