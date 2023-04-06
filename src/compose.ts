import { ComposableReducer } from "./types";

const compose = <TState, TAction>(
  reducers: ComposableReducer<TState, TAction>[]
) => {
  const getNext =
    (position: number, action: TAction) =>
    (state: TState): TState => {
      if (position >= reducers.length) {
        return state;
      }
      const next = getNext(position + 1, action);
      if (reducers[position].length < 3) {
        return next(reducers[position](state, action));
      }
      return reducers[position](state, action, next);
    };

  return (state: TState, action: TAction) => getNext(0, action)(state);
};

export default compose;
