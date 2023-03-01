const mapByType = (
  reducers: { [type: string]: ComposableReducer } = {}
): ComposableReducer => {
  const reducerKeys = Object.keys(reducers);
  for (const element of reducerKeys) {
    const key = element;
    if (typeof reducers[key] !== "function") {
      throw new Error(`Key "${key}" in mapByType is not a reducer`);
    }
  }
  return (state, action) => {
    if (typeof reducers[action.type] === "undefined") {
      return state;
    }
    return reducers[action.type](state, action);
  };
};

export default mapByType;
