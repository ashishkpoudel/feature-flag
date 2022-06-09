import { IFeature } from '../src/interface/feature.interface';
import { IFeatureFilter } from '../src/interface/feature-filter.interface';
import { FeatureFlag } from '../src/decorator/feature-flag.decorator';
import { FeatureManager } from '../src/feature-manager';
import { featureFlagStore } from '../src/feature-flag.store';
import { IFeatureFilterHandler } from '../src/interface/feature-filter-handler.interface';
import { FeatureFilterHandler } from '../src/decorator/feature-filter-handler.decorator';
import { IFeatureContext } from '../src/interface/feature-context.interface';

describe('Feature Flag Filter', () => {
  class FeatureContext implements IFeatureContext {
    readonly email?: string;
    readonly browser?: string;

    constructor(props: Partial<FeatureContext>) {
      Object.assign(this, props);
    }
  }

  class AllowedBrowserFilter implements IFeatureFilter {
    constructor(readonly browsers: readonly string[]) {}
  }

  @FeatureFilterHandler(AllowedBrowserFilter)
  class _AllowBrowserFilterHandler
    implements IFeatureFilterHandler<AllowedBrowserFilter, FeatureContext>
  {
    async evaluate(filter, context): Promise<boolean> {
      if (!context.browser) throw new Error('Allow browser filter requires param: browser');
      return filter.browsers.includes(context.browser);
    }
  }

  class AllowUsersFilter implements IFeatureFilter {
    constructor(readonly emails: readonly string[]) {}
  }

  @FeatureFilterHandler(AllowUsersFilter)
  class _AllowUsersFilterHandler
    implements IFeatureFilterHandler<AllowUsersFilter, FeatureContext>
  {
    async evaluate(filter, context): Promise<boolean> {
      if (!context.email) throw new Error('Allow users filter requires param: email');
      return filter.emails.includes(context.email);
    }
  }

  beforeEach(() => {
    featureFlagStore.clear();
  });

  it('feature should be disabled if filters does not resolves to true', async () => {
    const featureManager = new FeatureManager('production');

    @FeatureFlag('production', [new AllowUsersFilter(['allow@example.com'])])
    class HostReport implements IFeature {}

    const context = new FeatureContext({ email: 'do-not-allow@gmail.com' });
    expect(await featureManager.isEnabled(HostReport, context)).toEqual(false);
  });

  it('feature should be enabled when one of the filter evaluates to true', async () => {
    const featureManager = new FeatureManager('production');

    @FeatureFlag('production', [
      new AllowUsersFilter(['ram@gmail.com']),
      new AllowedBrowserFilter(['firefox']),
    ])
    class HostReport implements IFeature {}

    const context = new FeatureContext({ email: 'do-not-allow@gmail.com', browser: 'firefox' });
    expect(await featureManager.isEnabled(HostReport, context)).toEqual(true);
  });
});
