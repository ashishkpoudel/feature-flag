import { IStrategy } from './strategy.interface';

export interface IStrategyHandler<TStrategy extends IStrategy, TContext extends any = any> {
  evaluate(filter: TStrategy, context?: TContext): Promise<boolean>;
}
