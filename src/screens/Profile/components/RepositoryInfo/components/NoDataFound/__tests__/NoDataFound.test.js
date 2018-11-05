import React from "react";
import { shallow } from "enzyme";

import NoDataFound from "../NoDataFound";

describe("NoDataFound Component", () => {
  let wrapper;

  describe("render", () => {
    beforeEach(() => {
      wrapper = shallow(<NoDataFound />);
    });

    it("should match with the html structure of the snapshot", () =>
      expect(wrapper).toMatchSnapshot());
  });
});
