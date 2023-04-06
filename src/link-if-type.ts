import linkIf from "./link-if";
import { ComposableReducer } from "./types";

const linkIfType = <TState>(
  types: string[] = []
): ComposableReducer<TState, { type: string }> =>
  linkIf(
    (_state: TState, action: { type: string }) =>
      types.indexOf(action.type) !== -1
  );

export default linkIfType;
