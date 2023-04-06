import nextIf from "./next-if";
import { ComposableReducer } from "./types";

const nextIfType = <TState>(
  types: string[] = []
): ComposableReducer<TState, { type: string }> =>
  nextIf(
    (_state: TState, action: { type: string }) =>
      types.indexOf(action.type) !== -1
  );

export default nextIfType;
