import sinon from 'sinon';
import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import { always } from '../lib';

chai.use(sinonChai);

describe('always', () => {
  it('throws an error if a function is not supplied', () => {
    expect(always).to.throw('not a reducer');
    expect(() => always(1)).to.throw('not a reducer');
    expect(() => always({})).to.throw('not a reducer');
    expect(() => always(null)).to.throw('not a reducer');
  });

  it('calls the underlying reducer', () => {
    const innerReducer = sinon.spy();
    const next = sinon.spy();
    const reducer = always(innerReducer);
    reducer({}, { type: 'TYPE1' }, next);
    reducer({}, { type: 'TYPE2' }, next);
    reducer({}, { type: 'TYPE3' }, next);

    expect(innerReducer).to.have.been.calledThrice;
    expect(next).to.have.been.calledThrice;
  });
});
