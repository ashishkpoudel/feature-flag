import 'reflect-metadata';
import { FEATURE_FILTER_METADATA } from './constants';
import { IFeatureFilter } from '../interface/feature-filter.interface';

export function FeatureFilterHandler(featureFilter: IFeatureFilter): ClassDecorator {
  return (target) => {
    if (!Reflect.hasMetadata(FEATURE_FILTER_METADATA, featureFilter)) {
      Reflect.defineMetadata(FEATURE_FILTER_METADATA, target, featureFilter);
    }
  };
}
