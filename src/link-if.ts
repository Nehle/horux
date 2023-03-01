const linkIf = (predicate: (state: any, action: ReduxAction) => boolean) => {
  if (typeof predicate !== "function") {
    throw new Error('Supplied predicate to "linkIf" is not a function');
  }
  return (state: any, action: ReduxAction, next: (state: any) => any) =>
    predicate(state, action) ? next(state) : state;
};

export default linkIf;
