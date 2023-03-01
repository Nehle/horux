type ComposableReducer = (
  state: ReduxState,
  action: ReduxAction,
  next?: ComposableReducer
) => any;
