import linkIf from './link-if';

const linkIfType = (types = []) => linkIf((state, action) => types.indexOf(action.type) !== -1);

export default linkIfType;
