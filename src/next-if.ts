import { ComposableReducer } from "./types";

const nextIf = <TState, TAction>(
  predicate: (state: TState, action: TAction) => boolean
): ComposableReducer<TState, TAction> => {
  return (state: TState, action: TAction, next?: (state: TState) => TState) =>
    !!next && predicate(state, action) ? next(state) : state;
};

export default nextIf;
