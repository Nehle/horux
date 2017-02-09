const fastClone = state => JSON.parse(JSON.stringify(state));

const cloneState = (cloneFn = fastClone) => {
  if (!typeof cloneFn === 'function') {
    throw new Error('Clone function supplied to "cloneState" is not a function');
  }
  return state => cloneFn(state);
};

export default cloneState;
