const compose = (reducers = []) => {
  if (!Array.isArray(reducers)) {
    throw new Error('"reducers" must be an array');
  }
  for (let i = 0; i < reducers.length; i += 1) {
    if (typeof reducers[i] !== 'function') {
      throw new Error(`Element at position ${i} in "compose" is not a reducer`);
    }
  }

  return (state, action) => reducers.reduce(
    (currentState, currentReducer) => currentReducer(currentState, action), state,
  );
};

export default compose;
