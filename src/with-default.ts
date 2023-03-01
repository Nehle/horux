const withDefault = (defaultstate: ReduxState): ComposableReducer => {
  return (state) => (typeof state === "undefined" ? defaultstate : state);
};

export default withDefault;
