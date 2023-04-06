import { ComposableReducer } from "./types";

const withDefault = <TState, TAction>(
  defaultstate: TState
): ComposableReducer<TState, TAction> => {
  return (state) => (typeof state === "undefined" ? defaultstate : state);
};

export default withDefault;
