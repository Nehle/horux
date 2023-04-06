import { ComposableReducer } from "./types/composableReducer";

const mapByType = <TState>(
  reducers: { [type: string]: ComposableReducer<TState, { type: string }> } = {}
): ComposableReducer<TState, { type: string }> => {
  const reducerKeys = Object.keys(reducers);
  for (const element of reducerKeys) {
    const key = element;
    if (typeof reducers[key] !== "function") {
      throw new Error(`Key "${key}" in mapByType is not a reducer`);
    }
  }
  return (state, action: { type: string }, next) => {
    if (!action.type || typeof reducers[action.type] === "undefined") {
      return state;
    }
    return reducers[action.type](state, action, next);
  };
};

export default mapByType;
