const linkIf = (predicate: (state: ReduxState, action: ReduxAction) => boolean) => {
  if (typeof predicate !== "function") {
    throw new Error('Supplied predicate to "linkIf" is not a function');
  }
  return (state: ReduxState, action: ReduxAction, next: (state: ReduxState) => any) =>
    predicate(state, action) ? next(state) : state;
};

export default linkIf;
