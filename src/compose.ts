const compose = (reducers: ComposableReducer[]) => {
  if (!Array.isArray(reducers)) {
    throw new Error('Argument supplied to to "compose" is not an array');
  }

  for (let i = 0; i < reducers.length; i += 1) {
    if (typeof reducers[i] !== "function") {
      throw new Error(`Element at position ${i} in "compose" is not a reducer`);
    }
  }

  const getNext =
    (position: number, action: any) =>
    (state: any): Function => {
      if (position >= reducers.length) {
        return state;
      }
      const next = getNext(position + 1, action);
      if (reducers[position].length < 3) {
        return next(reducers[position](state, action));
      }
      return reducers[position](state, action, next);
    };

  return (state: any, action: any) => getNext(0, action)(state);
};

export default compose;
