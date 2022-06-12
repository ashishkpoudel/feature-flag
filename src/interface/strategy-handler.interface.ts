import { IStrategy } from './strategy.interface';

export interface IStrategyHandler<TStrategy extends IStrategy = IStrategy, TContext = any> {
  evaluate(strategy: TStrategy, context?: TContext): Promise<boolean>;
}
