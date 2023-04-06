import { withDefault } from "../src";

describe("withDefault", () => {
  it("returns a reducer", () => {
    expect(typeof withDefault(1)).toBe("function");
  });

  it("returns the defined defaultState if state is undefined", () => {
    expect(
      withDefault<number | undefined, object>(3)(undefined, {}, jest.fn())
    ).toEqual(3);
  });

  it("returns the given state if it is defined", () => {
    expect(withDefault(3)(1, {}, jest.fn())).toEqual(1);
  });
});
