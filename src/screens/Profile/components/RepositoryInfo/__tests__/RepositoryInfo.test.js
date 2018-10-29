import React from "react";
import { mount } from "enzyme";
import { MockedProvider } from "react-apollo/test-utils";
import wait from "waait";

import RepositoryInfo from "../RepositoryInfo";
import { GET_REPOSITORIES_INFORMATION } from "../query";

import queryMock from "./fixtures/query-mock";

const variables = { name: "wesbos", id: "MDQ6VXNlcjMzOTk0Mjk=" };

const queryMockWithData = {
  request: {
    query: GET_REPOSITORIES_INFORMATION,
    variables
  },
  result: {
    data: queryMock
  }
};

const queryErrorMock = {
  request: {
    query: GET_REPOSITORIES_INFORMATION,
    variables
  },
  error: new Error("Query Error")
};

describe("Repository Info Component", () => {
  describe("render", () => {
    let wrapper;

    describe("when it's loading", () => {
      let className, color, loading, margin, size, sizeUnit, spinner;

      beforeAll(() => {
        wrapper = mount(
          <MockedProvider mocks={[]} addTypename={false}>
            <RepositoryInfo />
          </MockedProvider>
        );

        spinner = wrapper.find("Loader");
        ({
          className,
          color,
          loading,
          margin,
          size,
          sizeUnit
        } = spinner.props());
      });

      it("should show a spinner", () => expect(spinner).toHaveLength(1));
      it('should have a "className" prop with "spinner" value', () =>
        expect(className).toBe("spinner"));
      it('should have a "color" prop with "#90C3FF" value', () =>
        expect(color).toBe("#90C3FF"));
      it('should have a "loading" prop with "true" value', () =>
        expect(loading).toBe(true));
      it('should have a "margin" prop with "1rem" value', () =>
        expect(margin).toBe("1rem"));
      it('should have a "size" prop with "5" value', () =>
        expect(size).toBe(5));
      it('should have a "sizeUnit" prop with "rem" value', () =>
        expect(sizeUnit).toBe("rem"));
    });

    describe("when it has an error", () => {
      let error;

      beforeAll(async () => {
        wrapper = mount(
          <MockedProvider mocks={[queryErrorMock]} addTypename={false}>
            <RepositoryInfo login="wesbos" id="124345343" />
          </MockedProvider>
        );

        await wait(0);
        wrapper.update();

        error = wrapper.find("ErrorReport");
      });

      it('should display an "ErrorReport" componet', () =>
        expect(error).toHaveLength(1));

      it("should has a default description for error", () =>
        expect(error.prop("description")).toBe("No results found"));
    });

    describe.only("without errors", () => {
      describe("when has just one page", () => {});

      describe("when has more than one page", () => {
        beforeAll(async () => {
          wrapper = mount(
            <MockedProvider mocks={[queryMockWithData]} addTypename={false}>
              <RepositoryInfo login="wesbos" id="MDQ6VXNlcjMzOTk0Mjk=" />
            </MockedProvider>
          );

          // await wait(0);
          // wrapper.update();
        });

        it("should", () => {
          console.log("HERE", wrapper.debug());
        });
      });
    });
  });
});
