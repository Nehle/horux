import { nextIf } from "../src";

describe("filter", () => {
  it("is exported properly", () => {
    expect(typeof nextIf).toBe("function");
  });

  it('calls "next" if the predicate returns truthy', () => {
    const reducer = nextIf(() => true);
    const next = jest.fn();
    reducer({}, {}, next);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('doesn\'t call "next" if the predicate returns falsy', () => {
    const reducer = nextIf(() => false);
    const next = jest.fn();
    reducer({}, {}, next);
    expect(next).not.toHaveBeenCalled();
  });
});
