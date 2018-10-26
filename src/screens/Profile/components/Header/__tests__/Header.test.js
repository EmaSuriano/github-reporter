import React from "react";
import { shallow } from "enzyme";

import Header from "../Header";

const searchProfile = jest.fn();

const props = {
  searchProfile
};

describe("Header Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Header {...props} />);
  });

  describe("render", () => {
    it("should match with html structure of the snapshot", () =>
      expect(wrapper).toMatchSnapshot());
  });

  describe("methods", () => {
    const mockedEvent = { target: { value: "wesbos" } };

    describe("handleInput", () => {
      let query;

      beforeAll(() => {
        wrapper.instance().handleInput(mockedEvent);
        query = wrapper.state().query;
      });

      it("should set state with a new value", () =>
        expect(query).toBe("wesbos"));
    });

    describe("handleSearch", () => {
      beforeAll(() => {
        wrapper.instance().handleInput(mockedEvent);
        wrapper.instance().handleSearch();
      });

      it("should call to searchProfile function", () =>
        expect(searchProfile).toHaveBeenCalledTimes(1));

      it("should call with the state", () =>
        expect(searchProfile).toHaveBeenCalledWith("wesbos"));
    });
  });
});
