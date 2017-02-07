import sinon from 'sinon';
import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import chain from '../lib/chain';

chai.use(sinonChai);

describe('chain', () => {
  it('returns the supplied state for an empty chain', () => {
    const state = { foo: 'bar' };
    const reducerChain = chain([]);

    expect(reducerChain(state)).to.equal(state);
  });

  it('calls the reducer in the chain with state, action and next', () => {
    const reducer = sinon.spy();
    const state = { foo: 'bar' };
    const action = { type: 'action' };
    const reducerChain = chain([reducer]);

    reducerChain(state, action);

    expect(reducer).to.have.been.calledWith(state, action, sinon.match.func);
  });

  it('returns an updated state from the first reducer in the state', () => {
    const reducer = state => state + 1;
    const reducerChain = chain([reducer]);

    expect(reducerChain(1)).to.equal(2);
  });

  it('call the next reducer when `next` is called in a reducer', () => {
    const reducer = (state, action, next) => next(state + 1);
    const action = { type: 'action' };
    const nextReducer = sinon.spy();
    const reducerChain = chain([reducer, nextReducer]);

    reducerChain(1, action);

    expect(nextReducer).to.have.been.calledWith(2, action);
  });

  it('returns the state from nextReducer when next is called', () => {
    const reducer = (state, action, next) => next(state + 1);
    const action = { type: 'action' };
    const nextReducer = sinon.stub().returns('Hello!');
    const reducerChain = chain([reducer, nextReducer]);
    const finalState = reducerChain(1, action);

    expect(finalState).to.equal('Hello!');
  });

  it("doesn't call the next reducer if next isn't called", () => {
    const reducer = state => state + 1;
    const action = { type: 'action' };
    const nextReducer = sinon.spy();
    const reducerChain = chain([reducer, nextReducer]);

    const nextState = reducerChain(1, action);

    expect(nextState).to.equal(2);
    expect(nextReducer).to.not.have.been.called;
  });
});
