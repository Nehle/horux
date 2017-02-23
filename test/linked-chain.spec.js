import sinon from 'sinon';
import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import { linkedChain } from '../lib';

chai.use(sinonChai);

describe('linkedChain', () => {
  it('is properly exported', () => {
    expect(linkedChain).to.be.a('function');
  });

  it('returns a reducer', () => {
    expect(linkedChain([])).to.be.a('function');
  });

  it('returns the supplied state for an empty chain', () => {
    const state = { foo: 'bar' };
    const reducerChain = linkedChain([]);

    expect(reducerChain(state)).to.equal(state);
  });

  it('calls the reducer in the chain with state, action and next if it accepts', () => {
    const reducer = sinon.spy((state, action, next) => {});
    const state = { foo: 'bar' };
    const action = { type: 'action' };
    const reducerChain = linkedChain([reducer]);

    reducerChain(state, action);

    expect(reducer).to.have.been.calledWith(state, action, sinon.match.func);
  });

  it('calls the first reducer in the chain only with state and action if it doesn\'t take next', () => {
    const reducer = sinon.spy((state, action) => {});
    const state = { foo: 'bar' };
    const action = { type: 'action' };
    const reducerChain = linkedChain([reducer]);

    reducerChain(state, action);

    expect(reducer).to.have.been.calledWith(state, action);
  });

  it('automatically calls the second reducer if the first reducer doesnt take next', () => {
    const first = () => 'test';
    const state = { foo: 'bar' };
    const action = { type: 'action' };
    const second = sinon.spy();
    const reducerChain = linkedChain([first, second]);

    reducerChain(state, action);
    expect(second).to.have.been.calledWith('test', action);
  });

  it('doesnt\'t call the second reducer if the first reducer takes next', () => {
    const first = (state, action, next) => 'test';
    const state = { foo: 'bar' };
    const action = { type: 'action' };
    const second = sinon.spy();
    const reducerChain = linkedChain([first, second]);

    reducerChain(state, action);
    expect(second).to.not.have.been.called;
  });
});
