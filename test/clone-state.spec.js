import { expect } from 'chai';
import { cloneState } from '../lib';

describe('cloneState', () => {
  const testState = { test: { deep: 'clone' } };
  it('makes a copy of the state', () => {
    expect(cloneState(testState)).to.eql(testState);
  });

  it('is not the same object', () => {
    expect(cloneState(testState)).to.not.equal(testState);
  });
});
