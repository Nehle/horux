import isPlainObject from "is-plain-object";

const mergeStates = (reducer: ComposableReducer): ComposableReducer => {
  if (typeof reducer !== "function") {
    throw new Error('Argument supplied to "mergeStates" is not a reducer');
  }

  return (state, action) => {
    if (!isPlainObject(state)) {
      const type = typeof state;
      throw new Error(
        `"mergeStates" only works with plain object states, but got a "${type}"`
      );
    }
    const nextState = reducer(state, action);
    if (!isPlainObject(nextState)) {
      const type = typeof nextState;
      throw new Error(
        `The reducer in "mergeStates" did not return a plain object. Instead it was a "${type}"`
      );
    }
    return Object.assign({}, state, nextState);
  };
};

export default mergeStates;
