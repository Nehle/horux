import { filter, linkIf } from "../src";

describe("filter", () => {
  it("is exported properly", () => {
    expect(typeof filter).toBe("function");
  });

  it("has the linkIf alias", () => {
    expect(filter).toEqual(linkIf);
  });
  it('calls "next" if the predicate returns truthy', () => {
    const reducer = filter(() => true);
    const next = jest.fn();
    reducer({}, {}, next);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('doesn\'t call "next" if the predicate returns falsy', () => {
    const reducer = filter(() => false);
    const next = jest.fn();
    reducer({}, {}, next);
    expect(next).not.toHaveBeenCalled();
  });
});
