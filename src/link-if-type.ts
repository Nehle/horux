import linkIf from "./link-if";

const linkIfType = (types = []) =>
  linkIf(
    (_state: any, action: ReduxAction) => types.indexOf(action.type) !== -1
  );

export default linkIfType;
