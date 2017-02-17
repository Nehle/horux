const withDefault = (defaultState) => {
  if (typeof defaultState === 'undefined') {
    throw new Error('"withDefault" must have a defined defaultState');
  }
  return state => (typeof state === 'undefined' ? defaultState : state);
};

export default withDefault;
