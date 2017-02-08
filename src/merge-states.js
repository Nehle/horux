import isPlainObject from 'is-plain-object';
import assign from 'object-assign';

const merge = (reducer) => {
  if (typeof reducer !== 'function') {
    throw new Error('Argument supplied to `merge` is not a reducer');
  }

  return (state, action) => {
    if (!isPlainObject(state)) {
      throw new Error('`merge` only works with plain object states');
    }
    const nextState = reducer(state, action);
    if (!isPlainObject(nextState)) {
      throw new Error('The reducer in `merge` did not return a plain object');
    }
    return assign({}, state, nextState);
  };
};

export default merge;
