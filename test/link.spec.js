import sinon from 'sinon';
import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import { link } from '../lib';

chai.use(sinonChai);

describe('link', () => {
  it('throws an error if a function is not supplied', () => {
    expect(link).to.throw('not a reducer');
    expect(() => link(1)).to.throw('not a reducer');
    expect(() => link({})).to.throw('not a reducer');
    expect(() => link(null)).to.throw('not a reducer');
  });

  it('returns a reducer', () => {
    expect(link(() => {})).to.be.a('function');
  });

  it('calls the underlying reducer with "next"', () => {
    const innerReducer = sinon.spy();
    const next = sinon.spy();
    const reducer = link(innerReducer);
    reducer({}, { type: 'TYPE1' }, next);
    reducer({}, { type: 'TYPE2' }, next);
    reducer({}, { type: 'TYPE3' }, next);

    expect(innerReducer).to.have.been.calledThrice;
    expect(next).to.have.been.calledThrice;
  });
});
