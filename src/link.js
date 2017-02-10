/**
Higher-order reducer meant to be used with with the `chain` reducer. Will always call the next
reducer with the result of `innerReducer`

@param {function} innerReducer - The reducer to wrap
@returns An updated state
*/
const link = (innerReducer) => {
  if (typeof innerReducer !== 'function') {
    throw new Error('Supplied argument to "always" is not a reducer');
  }
  return (state, action, next) => next(innerReducer(state, action));
};

export default link;
