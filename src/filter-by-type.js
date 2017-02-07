import filter from './filter';

const filterByType = (types = []) => filter((state, action) => types.indexOf(action.type) !== -1);

export default filterByType;
