import { IFeature } from '../src/interface/feature.interface';
import { IStrategy } from '../src/interface/strategy.interface';
import { FeatureFlag } from '../src/decorator/feature-flag.decorator';
import { FeatureManager } from '../src/feature-manager';
import { featureFlagStore } from '../src/feature-flag.store';
import { IStrategyHandler } from '../src/interface/strategy-handler.interface';
import { StrategyHandler } from '../src/decorator/strategy-handler.decorator';

describe('Feature Flag Strategy', () => {
  interface FeatureManagerContext {
    readonly email?: string;
    readonly browser?: string;
  }

  class AllowedBrowser implements IStrategy {
    constructor(readonly browsers: readonly string[]) {}
  }

  @StrategyHandler(AllowedBrowser)
  class _AllowBrowserHandler implements IStrategyHandler<AllowedBrowser, FeatureManagerContext> {
    async evaluate(filter, context): Promise<boolean> {
      if (!context.browser) throw new Error('Allow browser filter requires param: browser');
      return filter.browsers.includes(context.browser);
    }
  }

  class AllowUsers implements IStrategy {
    constructor(readonly emails: readonly string[]) {}
  }

  @StrategyHandler(AllowUsers)
  class _AllowUsersHandler implements IStrategyHandler<AllowUsers, FeatureManagerContext> {
    async evaluate(filter, context): Promise<boolean> {
      if (!context.email) throw new Error('Allow users filter requires param: email');
      return filter.emails.includes(context.email);
    }
  }

  beforeEach(() => {
    featureFlagStore.clear();
  });

  it('feature should be disabled if strategies does not resolves to true', async () => {
    const featureManager = new FeatureManager('production');

    @FeatureFlag('production', [new AllowUsers(['allow@example.com'])])
    class HostReport implements IFeature {}

    const context = { email: 'do-not-allow@gmail.com' } as FeatureManagerContext;
    expect(await featureManager.isEnabled(HostReport, context)).toEqual(false);
  });

  it('feature should be enabled when one of the strategy evaluates to true', async () => {
    const featureManager = new FeatureManager('production');

    @FeatureFlag('production', [new AllowUsers(['ram@gmail.com']), new AllowedBrowser(['firefox'])])
    class HostReport implements IFeature {}

    const context = {
      email: 'do-not-allow@gmail.com',
      browser: 'firefox',
    } as FeatureManagerContext;

    expect(await featureManager.isEnabled(HostReport, context)).toEqual(true);
  });
});
