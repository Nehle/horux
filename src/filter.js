const filter = (predicate) => {
  if (typeof predicate !== 'function') {
    throw new Error('Supplied predicate to "filter" is not a function');
  }
  return (state, action, next) => (predicate(state, action) ? next(state) : state);
};

export default filter;
