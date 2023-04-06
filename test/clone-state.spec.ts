import { cloneState } from "../src";

describe("cloneState", () => {
  const testState = { test: { deep: "clone" } };

  it("is exported properly", () => {
    expect(typeof cloneState).toBe("function");
  });

  it("makes a copy of the state", () => {
    expect(cloneState(testState)).toStrictEqual(testState);
  });

  it("is not the same object", () => {
    expect(cloneState(testState)).not.toBe(testState);
  });
});
