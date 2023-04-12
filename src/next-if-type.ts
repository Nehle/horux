import nextIf from "./next-if";
import { ComposableReducer } from "./types";

const nextIfType = <TState, TAction extends { type: string }>(
  types: string[] = []
): ComposableReducer<TState, TAction> =>
  nextIf(
    (_state: TState, action: TAction) => types.indexOf(action.type) !== -1
  );

export default nextIfType;
