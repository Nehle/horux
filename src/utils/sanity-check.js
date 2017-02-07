import warn from './warn';

const isReducer = reducer => typeof reducer === 'function';

const handlesUndefined = reducer => (reducer(undefined, { type: '@@PROBE' }) !== undefined);

const isSane = (reducer, context) => {
  if (!isReducer(reducer)) {
    warn(`${context}. Supplied reducer is not a function`);
    return false;
  }
  if (!handlesUndefined(reducer)) {
    warn(`${context}. Supplied reducer returned returned "undefined" for state undefined`);
    return false;
  }
  return true;
};

export default isSane;
