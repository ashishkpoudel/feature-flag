export interface FeatureFilter {
  evaluate: () => Promise<boolean>;
}
