import React from "react";
import { shallow } from "enzyme";

import Statistics from "../Statistics";

import data from "./fixtures/data/data";
import configuration from "./fixtures/configuration/configuration";

const props = {
  data,
  configuration,
  title: "Title"
};

describe("Statistics Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Statistics {...props} />);
  });

  describe("render", () => {
    it("should match with the html structure of snapshot", () =>
      expect(wrapper).toMatchSnapshot());
  });
});
