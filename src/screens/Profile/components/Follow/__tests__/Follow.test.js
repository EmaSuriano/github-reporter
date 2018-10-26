import React from "react";
import { shallow } from "enzyme";

import Follow from "../Follow";

const props = {
  icon: <span>Icon</span>,
  title: "Title",
  quantity: 10
};

describe("Follow Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Follow {...props} />);
  });

  describe("render", () => {
    it("should be match with html structure of the snapshot", () =>
      expect(wrapper).toMatchSnapshot());
  });
});
