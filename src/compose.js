const compose = (reducers = []) => {
  if (!Array.isArray(reducers)) {
    throw new Error('"reducers" argument to "compose" must be an array');
  }
  for (let i = 0; i < reducers.length; i += 1) {
    if (typeof reducers[i] !== 'function') {
      throw new Error(`Element at position ${i} in "compose" is not a reducer`);
    }
  }

  const getNext = (position, action) => (state) => {
    if (position >= reducers.length) {
      return state;
    }
    const next = getNext(position + 1, action);
    if (reducers[position].length < 3) {
      return next(reducers[position](state, action));
    }
    return reducers[position](state, action, next);
  };

  return (state, action) => getNext(0, action)(state);
};

export default compose;
