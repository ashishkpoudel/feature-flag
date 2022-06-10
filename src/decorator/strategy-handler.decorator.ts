import 'reflect-metadata';
import { FEATURE_FILTER_METADATA } from './constants';
import { IStrategy } from '../interface/strategy.interface';

export function StrategyHandler(strategy: IStrategy): ClassDecorator {
  return (target) => {
    if (!Reflect.hasMetadata(FEATURE_FILTER_METADATA, strategy)) {
      Reflect.defineMetadata(FEATURE_FILTER_METADATA, target, strategy);
    }
  };
}
