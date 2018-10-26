import constants from "../";

describe("Constants", () => {
  it("should be match with the structure of the snapshot", () =>
    expect(constants).toMatchSnapshot());
});
