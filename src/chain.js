const chain = (reducers = []) => {
  for (let i = 0; i < reducers.length; i += 1) {
    if (typeof reducers[i] !== 'function') {
      throw new Error(`Element at position ${i} in "chain" is not a reducer`);
    }
  }
  const prepareReducer = (position, action) => (state) => {
    if (position >= reducers.length) {
      return state;
    }
    return reducers[position](state, action, prepareReducer(position + 1, action));
  };

  return (state, action) => prepareReducer(0, action)(state);
};

export default chain;
