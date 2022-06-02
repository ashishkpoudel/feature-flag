import 'reflect-metadata';
import { IFeatureFilter } from '../interface/feature-filter.interface';
import { FEATURE_FILTER_METADATA } from './constants';

export function FeatureFilterHandler(featureFilter: Function): ClassDecorator {
  return (target) => {
    if (!Reflect.hasMetadata(FEATURE_FILTER_METADATA, featureFilter)) {
      Reflect.defineMetadata(FEATURE_FILTER_METADATA, target, featureFilter);
    }
  };
}
