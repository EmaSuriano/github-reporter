import {
  createData,
  getEdges,
  getEndCursor,
  getPageInfo,
  getStatistics,
  getTotalCount,
  hasNextPage,
  updateRepositoryData
} from "../statistics";

import {
  removeEmpties,
  removeLowerThan,
  sortingByParam,
  transformStatistics
} from "../helpers";

import edge from "./fixtures/edge";
import edgeForked from "./fixtures/edgeForked";

jest.mock("../helpers", () => ({
  removeEmpties: jest.fn(),
  removeLowerThan: jest.fn(),
  sortingByParam: jest.fn(),
  transformStatistics: jest.fn()
}));

describe("Statistics", () => {
  describe("createData", () => {});

  describe("getEdges", () => {
    let result;

    beforeEach(() => {
      const statistics = { user: { repositories: { edges: [5, 2] } } };
      result = getEdges(statistics);
    });

    it('should return edges "[5, 2]"', () => expect(result).toEqual([5, 2]));
  });

  describe("getEndCursor", () => {
    let result;

    beforeEach(() => {
      const testData = { endCursor: "cursorId" };
      result = getEndCursor(testData);
    });

    it('should return "cursorId" as endCursor prop', () =>
      expect(result).toBe("cursorId"));
  });

  describe("getPageInfo", () => {
    let result;

    beforeEach(() => {
      const statistics = { user: { repositories: { pageInfo: "pageInfo" } } };
      result = getPageInfo(statistics);
    });

    it('should return "pageInfo"', () => expect(result).toBe("pageInfo"));
  });

  describe("getStatistics", () => {
    let result;

    describe("when edge has forked", () => {
      beforeEach(() => {
        result = getStatistics([], edgeForked);
      });

      it("should return respositories property without commits and stars", () =>
        expect(result.repositories).toEqual({ "anchor-css-transition": {} }));

      it("should return languages property without repositories and stars", () =>
        expect(result.languages).toEqual({ Unknown: { commits: 1 } }));
    });

    describe("when edge has not forked", () => {
      beforeEach(() => {
        result = getStatistics([], edge);
      });

      it("should return", () =>
        expect(result).toEqual({
          languages: {
            JavaScript: { commits: 47, repositories: 1, stars: 24 }
          },
          repositories: { "gatsby-starter-mate": { commits: 47, stars: 24 } }
        }));
    });
  });

  describe("getTotalCount", () => {
    let result;

    beforeEach(() => {
      const testData = { totalCount: 5 };
      result = getTotalCount(testData);
    });

    it('should return "5" as totalCount', () => expect(result).toBe(5));
  });

  describe("hasNextPage", () => {
    let result;

    describe('when "hasNextPage" prop exists', () => {
      beforeEach(() => {
        const testData = { hasNextPage: true };
        result = hasNextPage(testData);
      });

      it("should return true", () => expect(result).toBeTruthy());
    });

    describe('when "hasNextPage" prop does not exist', () => {
      beforeEach(() => {
        result = hasNextPage({});
      });

      it("should return false as default value", () =>
        expect(result).toBeFalsy());
    });
  });

  describe("updateRepositoryData", () => {});
});
