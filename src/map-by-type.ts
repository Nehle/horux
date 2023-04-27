import { ComposableReducer } from "./types/composableReducer";

const mapByType = <TState, TAction extends { type: string }>(
  reducers: { [type: string]: ComposableReducer<TState, TAction> } = {}
): ComposableReducer<TState, TAction> => {
  const reducerKeys = Object.keys(reducers);
  for (const element of reducerKeys) {
    const key = element;
    if (typeof reducers[key] !== "function") {
      throw new Error(`Key "${key}" in mapByType is not a reducer`);
    }
  }
  return (state, action: TAction) => {
    if (!action.type || typeof reducers[action.type] === "undefined") {
      return state;
    }
    return reducers[action.type](state, action);
  };
};

export default mapByType;
