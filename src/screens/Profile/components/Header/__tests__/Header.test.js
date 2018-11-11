import React from "react";
import { mount } from "enzyme";

import Header from "../Header";

const searchProfile = jest.fn();

const props = {
  searchProfile
};

describe("Header Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Header {...props} />);
  });

  describe("render", () => {
    it("should match with html structure of the snapshot", () =>
      expect(wrapper).toMatchSnapshot());
  });

  describe("inner methods", () => {
    const mockedEvent = { target: { value: "wesbos" } };

    describe("componentDidMount instance", () => {
      beforeEach(() => {
        wrapper.instance().componentDidMount();
      });

      it("should create a reference called 'inputRef'", () =>
        expect(wrapper.instance().inputRef).toBeDefined());
    });

    describe("handleInput instance", () => {
      let query;

      beforeAll(() => {
        wrapper.instance().handleInput(mockedEvent);
        query = wrapper.state().query;
      });

      it("should set state with a new value", () =>
        expect(query).toBe("wesbos"));
    });

    describe("handleSearch instance", () => {
      beforeAll(() => {
        wrapper.instance().handleInput(mockedEvent);
        wrapper.instance().handleSearch();
      });

      it("should call to searchProfile function", () =>
        expect(searchProfile).toHaveBeenCalledTimes(1));

      it("should call with the state", () =>
        expect(searchProfile).toHaveBeenCalledWith("wesbos"));
    });

    describe("handleKeyPress instance", () => {
      let handleSearchSpy;

      beforeAll(() => {
        handleSearchSpy = jest.spyOn(wrapper.instance(), "handleSearch");
      });

      afterEach(() => {
        handleSearchSpy.mockClear();
      });

      describe("when press enter", () => {
        beforeAll(() => {
          const e = { key: "Enter" };
          wrapper.instance().handleKeyPress(e);
        });

        it('should call "handleSearch" function once', () =>
          expect(handleSearchSpy).toHaveBeenCalledTimes(1));
      });

      describe("when not press enter", () => {
        beforeAll(() => {
          const e = { key: "Z" };
          wrapper.instance().handleKeyPress(e);
        });

        it('should not call "handleSearch" function', () =>
          expect(handleSearchSpy).toHaveBeenCalledTimes(0));
      });
    });
  });
});
