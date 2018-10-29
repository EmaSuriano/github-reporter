import React from "react";
import { shallow } from "enzyme";

import Main from "../Main";

describe("Main Profile Screen Component", () => {
  let wrapper;

  describe("render", () => {
    describe("when user is empty", () => {
      beforeEach(() => {
        wrapper = shallow(<Main />);
      });

      it("should match with the html structre of the snapshot", () =>
        expect(wrapper).toMatchSnapshot());
    });

    describe("when user has data", () => {
      beforeEach(() => {
        wrapper = shallow(<Main />);
        wrapper.setState({ user: "wesbos" });
      });

      it("should match with the html structre of the snapshot", () =>
        expect(wrapper).toMatchSnapshot());
    });
  });

  describe("inner methods", () => {
    beforeEach(() => {
      wrapper = shallow(<Main />);
    });

    describe("searchProfile", () => {
      let user;

      beforeAll(() => {
        wrapper.setState({ user: "kentcdodds" });
        user = wrapper.state("user");
      });

      it("should set state when call to searchProfile", () =>
        expect(user).toBe("kentcdodds"));
    });
  });
});
