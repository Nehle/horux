import { ComposableReducer } from "./types/composableReducer";

const mergeStates = <TState, TAction>(
  reducer: ComposableReducer<TState, TAction>
): ComposableReducer<TState, TAction> => {
  return (state, action) => {
    const nextState = reducer(state, action);
    return Object.assign({}, state, nextState);
  };
};

export default mergeStates;
