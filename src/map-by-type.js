const mapByType = (reducers = {}) => {
  const reducerKeys = Object.keys(reducers);
  for (let i = 0; i < reducerKeys.length; i += 1) {
    const key = reducerKeys[i];
    if (typeof reducers[key] !== 'function') {
      throw new Error(`Key "${key}" in mapByType is not a reducer`);
    }
  }
  return (state, action) => {
    if (typeof reducers[action.type] === 'undefined') {
      return state;
    }
    return reducers[action.type](state, action);
  };
};

export default mapByType;
