export type ComposableReducer<TState, TAction> = (
  state: TState,
  action: TAction,
  next?: (state: TState) => TState
) => TState;
