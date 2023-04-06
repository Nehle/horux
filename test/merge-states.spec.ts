import { mergeStates } from "../src";

describe("mergeStates", () => {
  it("is exported properly", () => {
    expect(typeof mergeStates).toBe("function");
  });

  it("calls the inner reducer", () => {
    const innerReducer = jest.fn().mockReturnValue({});
    const reducer = mergeStates(innerReducer);
    reducer({}, {}, jest.fn());
    expect(innerReducer).toHaveBeenCalledTimes(1);
  });

  it("merges the states", () => {
    const innerReducer = () => ({ test1: "reducer" });
    const state = { test1: "state", test2: "state" };
    const reducer = mergeStates(innerReducer);
    expect(reducer(state, {}, jest.fn())).toEqual({
      test1: "reducer",
      test2: "state",
    });
  });
});
