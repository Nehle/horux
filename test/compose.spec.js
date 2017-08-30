import sinon from "sinon";
import chai, { expect } from "chai";
import sinonChai from "sinon-chai";
import { compose } from "../lib";

chai.use(sinonChai);

describe("compose", () => {
  it("is properly exported", () => {
    expect(compose).to.be.a("function");
  });

  it("returns a reducer", () => {
    expect(compose([])).to.be.a("function");
  });

  it("returns the supplied state for an empty chain", () => {
    const state = { foo: "bar" };
    const reducerChain = compose([]);

    expect(reducerChain(state)).to.equal(state);
  });

  it("calls the reducer in the chain with state, action and next if it accepts", () => {
    const reducer = sinon.spy((state, action, next) => {}); // eslint-disable-line no-unused-vars
    const state = { foo: "bar" };
    const action = { type: "action" };
    const reducerChain = compose([reducer]);

    reducerChain(state, action);

    expect(reducer).to.have.been.calledWith(state, action, sinon.match.func);
  });

  it("calls the first reducer in the chain only with state and action if it doesn't take next", () => {
    const reducer = sinon.spy((state, action) => {}); // eslint-disable-line no-unused-vars
    const state = { foo: "bar" };
    const action = { type: "action" };
    const reducerChain = compose([reducer]);

    reducerChain(state, action);

    expect(reducer).to.have.been.calledWith(state, action);
  });

  it("automatically calls the second reducer if the first reducer doesnt take next", () => {
    const first = () => "test";
    const state = { foo: "bar" };
    const action = { type: "action" };
    const second = sinon.spy();
    const reducerChain = compose([first, second]);

    reducerChain(state, action);
    expect(second).to.have.been.calledWith("test", action);
  });

  it("doesnt't call the second reducer if the first reducer takes next", () => {
    const first = (state, action, next) => "test"; // eslint-disable-line no-unused-vars
    const state = { foo: "bar" };
    const action = { type: "action" };
    const second = sinon.spy();
    const reducerChain = compose([first, second]);

    reducerChain(state, action);
    expect(second).to.not.have.been.called;
  });
});
