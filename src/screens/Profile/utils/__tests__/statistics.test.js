import {
  createConfiguration,
  createData,
  getEdges,
  getEndCursor,
  getPageInfo,
  getStatistics,
  getTotalCount,
  hasNextPage,
  updateRepositoryData
} from "../statistics";

import edge from "./fixtures/edge";
import edgeForked from "./fixtures/edgeForked";

describe("Statistics", () => {
  describe("createConfiguration", () => {
    let result;

    beforeEach(() => {
      const user = "wesbos";
      const configuration = { width: 100, height: 100 };
      result = createConfiguration(user, configuration);
    });

    it("should match configuration object with the snapshot", () =>
      expect(result).toMatchSnapshot());
  });
  describe("createData", () => {
    let result;

    beforeEach(() => {
      const data = { languages: { HTML: { stars: 100 } } };
      const from = "languages";
      const currentProp = "stars";
      result = createData(data, from, currentProp);
    });

    it("should match the object created by the function with the datasets and labels", () =>
      expect(result).toMatchSnapshot());
  });

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

  describe("updateRepositoryData", () => {
    let result;

    beforeEach(() => {
      const repositoryInfo = {
        user: {
          repositories: {
            pageInfo: {
              hasNextPage: true,
              endCursor: ""
            },
            edges: []
          }
        }
      };

      const edges = [
        {
          node: {
            name: "JavaScriptRepo",
            isFork: false,
            primaryLanguage: {
              name: "JavaScript"
            }
          }
        }
      ];
      const pageInfo = { hasNextPage: false, endCursor: "endCursor" };
      result = updateRepositoryData(repositoryInfo, edges, pageInfo);
    });

    it("should have one edge with 'JavaScriptRepo' as name", () => {
      expect(result.user.repositories.edges).toEqual([
        {
          node: {
            name: "JavaScriptRepo",
            isFork: false,
            primaryLanguage: { name: "JavaScript" }
          }
        }
      ]);
    });
  });
});
