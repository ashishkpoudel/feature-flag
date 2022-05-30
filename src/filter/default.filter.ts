import { FeatureFilter } from 'src/interface/feature-filter';

export class DefaultFilter implements FeatureFilter {
  constructor(private readonly value: boolean) {}

  async evaluate() {
    return this.value;
  }
}
