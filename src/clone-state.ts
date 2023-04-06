import { ComposableReducer } from "./types";

const cloneState = <TState>(state: TState): ComposableReducer<TState, never> =>
  JSON.parse(JSON.stringify(state));

export default cloneState;
