const compose = (reducers = []) => {
  for (let i = 0; i < reducers.length; i += 1) {
    if (typeof reducers[i] !== 'function') {
      throw new Error(`Element at position ${i} in "compose" is not a reducer`);
    }
  }

  return (state, action) => {
    let nextState = state;
    for (let i = 0; i < reducers.length; i += 1) {
      nextState = reducers[i](nextState, action);
    }
    return state;
  };
};

export default compose;
