import sinon from 'sinon';
import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import { filter, linkIf } from '../lib';

chai.use(sinonChai);

describe('filter', () => {
  it('is exported properly', () => {
    expect(filter).to.be.a('function');
  });

  it('has the linkIf alias', () => {
    expect(filter).to.eql(linkIf);
  });

  it('throws an error if "predicate" is not a function', () => {
    expect(() => filter()).to.throw('not a function');
  });

  it('calls "next" if the predicate returns truthy', () => {
    const reducer = filter(() => true);
    const next = sinon.spy();
    reducer(null, null, next);
    expect(next).to.have.been.calledOnce;
  });

  it('doesn\'t call "next" if the predicate returns falsy', () => {
    const reducer = filter(() => false);
    const next = sinon.spy();
    reducer(null, null, next);
    expect(next).to.not.have.been.called;
  });
});
