import linkIf from "./link-if";

const linkIfType = (types: string[] = []) =>
  linkIf(
    (_state: ReduxState, action: ReduxAction) =>
      types.indexOf(action.type) !== -1
  );

export default linkIfType;
