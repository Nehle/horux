import sinon from 'sinon';
import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import { linkIf } from '../lib';

chai.use(sinonChai);

describe('linkIf', () => {
  it('is exported properly', () => {
    expect(linkIf).to.be.a('function');
  });

  it('throws an error if "predicate" is not a function', () => {
    expect(() => linkIf()).to.throw('not a function');
  });

  it('calls "next" if the predicate returns truthy', () => {
    const reducer = linkIf(() => true);
    const next = sinon.spy();
    reducer(null, null, next);
    expect(next).to.have.been.calledOnce;
  });

  it('doesn\'t call "next" if the predicate returns falsy', () => {
    const reducer = linkIf(() => false);
    const next = sinon.spy();
    reducer(null, null, next);
    expect(next).to.not.have.been.called;
  });
});
