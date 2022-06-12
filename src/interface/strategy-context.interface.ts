import { IStrategy } from './strategy.interface';

export interface StrategyContext<TStrategy extends IStrategy = IStrategy, TContext = any> {
  strategy: TStrategy;
  context: TContext;
}
