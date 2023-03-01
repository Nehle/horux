type ComposableReducer = (
  state: any,
  action: ReduxAction,
  next?: ComposableReducer
) => any;
