import { ComposableReducer } from "./types/composableReducer";

const mergeStates = <TState, TAction>(
  reducer: ComposableReducer<TState, TAction>
): ComposableReducer<TState, TAction> => {
  return (state, action, next) => {
    const nextState = reducer(state, action, next);
    return Object.assign({}, state, nextState);
  };
};

export default mergeStates;
