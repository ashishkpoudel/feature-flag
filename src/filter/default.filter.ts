import { IFeatureFilter } from 'src/interface/feature-filter.interface';
import { IFeatureFilterHandler } from 'src/interface/feature-filter-handler.interface';
import { FeatureFilterHandler } from 'src/decorator/feature-filter-handler.decorator';

export class DefaultFilter implements IFeatureFilter {
  constructor(readonly value: boolean) {}
}

@FeatureFilterHandler(DefaultFilter)
export class DefaultFilterHandler implements IFeatureFilterHandler<DefaultFilter> {
  async evaluate(filter: DefaultFilter): Promise<boolean> {
    return filter.value;
  }
}
