import { expect } from 'chai';
import { withDefault } from '../lib';

describe('withDefault', () => {
  it('has been exported properly', () => {
    expect(withDefault).to.be.a('function');
  });

  it('throws an error if the given defaultState is undefined', () => {
    expect(() => withDefault()).to.throw('"withDefault" must have a defined defaultState');
  });

  it('returns a reducer', () => {
    expect(withDefault(1)).to.be.a('function');
  });

  it('returns the defined defaultState if state is undefined', () => {
    expect(withDefault(3)()).to.equal(3);
  });

  it('returns the given state if it is defined', () => {
    expect(withDefault(3)(1)).to.equal(1);
  });
});
