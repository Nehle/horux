const mergeStates = (reducer: ComposableReducer): ComposableReducer => {
  if (typeof reducer !== "function") {
    throw new Error('Argument supplied to "mergeStates" is not a reducer');
  }

  return (state, action) => {
    const nextState = reducer(state, action);
    return Object.assign({}, state, nextState);
  };
};

export default mergeStates;
