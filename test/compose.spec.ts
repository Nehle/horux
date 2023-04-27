import { compose } from "../src";
import { ComposableReducer } from "../src/types";

describe("compose", () => {
  it("is properly exported", () => {
    expect(typeof compose).toBe("function");
  });
  it("returns a reducer", () => {
    expect(typeof compose([])).toBe("function");
  });
  it("throws an error if the supplied reducers are not an array", () => {
    expect(() => compose({} as ComposableReducer<never, never>[])).toThrowError(
      "Reducers must be an array"
    );
  });
  it("throws an error if the supplied reducers are not an array of functions", () => {
    expect(() => compose([{} as ComposableReducer<never, never>])).toThrowError(
      'Reducer at position "0" is not a function'
    );
  });
  it("returns the supplied state for an empty chain", () => {
    const state = { foo: "bar" };
    const reducerChain = compose([]);

    expect(reducerChain(state, {})).toEqual(state);
  });

  it("calls the reducer in the chain with state, action and next if it accepts", () => {
    const reducer = jest.fn((a, b) => a + b);
    const state = { foo: "bar" };
    const action = { type: "action" };
    const reducerChain = compose([reducer]);

    reducerChain(state, action);

    expect(reducer).toHaveBeenCalledWith(state, action);
  });

  it("calls the first reducer in the chain only with state and action if it doesn't take next", () => {
    const reducer = jest.fn(); // eslint-disable-line no-unused-vars
    const state = { foo: "bar" };
    const action = { type: "action" };
    const reducerChain = compose([reducer]);

    reducerChain(state, action);

    expect(reducer).toHaveBeenLastCalledWith(state, action);
  });

  it("automatically calls the second reducer if the first reducer doesnt take next", () => {
    const first = () => "test";
    const state = { foo: "bar" };
    const action = { type: "action" };
    const second = jest.fn();
    const reducerChain = compose([first, second]);

    reducerChain(state, action);
    expect(second).toHaveBeenCalledWith("test", action);
  });

  it("doesnt't call the second reducer if the first reducer takes next", () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const first: ComposableReducer<string, object> = (_state, _action, _next) =>
      "test";
    const state = { foo: "bar" };
    const action = { type: "action" };
    const second = jest.fn();
    const reducerChain = compose([first, second]);

    reducerChain(state, action);
    expect(second).not.toHaveBeenCalled();
  });
});
