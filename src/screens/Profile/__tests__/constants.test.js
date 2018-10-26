import constants from "../constants";

describe("Constants", () => {
  it("should be match with all constants", () =>
    expect(constants).toMatchSnapshot());
});
