import { cloneState } from '../src';

describe('cloneState', () => {
  const testState = { test: { deep: 'clone' } };

  it('is exported properly', () => {
    expect(cloneState).to.be.a('function');
  });

  it('makes a copy of the state', () => {
    expect(cloneState(testState)).to.eql(testState);
  });

  it('is not the same object', () => {
    expect(cloneState(testState)).to.not.equal(testState);
  });
});
