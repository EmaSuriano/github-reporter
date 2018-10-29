import React from "react";
import { shallow } from "enzyme";

import Statistics from "../Statistics";

import data from "./fixtures/data/data";
import configuration from "./fixtures/configuration/configuration";

const propsWithLabels = {
  data,
  configuration,
  title: "Title"
};

const propsWithoutLabels = {
  data: [],
  title: "Title"
};

describe("Statistics Component", () => {
  let wrapper;

  describe("render", () => {
    describe("when labels are empty", () => {
      beforeEach(() => {
        wrapper = shallow(<Statistics {...propsWithoutLabels} />);
      });

      it("should match with the html structure of snapshot", () =>
        expect(wrapper).toMatchSnapshot());
    });

    describe("when have labels", () => {
      beforeEach(() => {
        wrapper = shallow(<Statistics {...propsWithLabels} />);
      });

      it("should match with the html structure of snapshot", () =>
        expect(wrapper).toMatchSnapshot());
    });
  });
});
