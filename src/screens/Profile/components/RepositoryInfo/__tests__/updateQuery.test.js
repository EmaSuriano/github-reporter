import updateQuery from "../updateQuery";
import {
  getEdges,
  getPageInfo,
  updateRepositoryData
} from "screens/Profile/utils";

const previousResult = "previousEdges";
const currentResult = {
  fetchMoreResult: "nextEdges"
};

jest.mock("screens/Profile/utils", () => ({
  getEdges: jest.fn(),
  getPageInfo: jest.fn(),
  updateRepositoryData: jest.fn()
}));

describe("Update Query Function", () => {
  let result;

  describe("when has new edges", () => {
    beforeAll(() => {
      getEdges.mockReturnValue([1, 2]);
      getPageInfo.mockReturnValue("New Page");
      updateRepositoryData.mockReturnValue("New value");
      result = updateQuery(previousResult, currentResult);
    });

    afterAll(() => {
      getEdges.mockClear();
      getPageInfo.mockClear();
      updateRepositoryData.mockClear();
    });

    it("should call getEdges twice", () =>
      expect(getEdges).toHaveBeenCalledTimes(2));
    it("should call getEdges the first time with 'nextEdges'", () =>
      expect(getEdges.mock.calls[0]).toEqual(["nextEdges"]));
    it("should call getEdges the second time with 'prevEdges", () =>
      expect(getEdges.mock.calls[1]).toEqual(["previousEdges"]));
    it("should call getPageInfo once", () =>
      expect(getPageInfo).toHaveBeenCalledTimes(1));
    it('should call getPageInfo with "nextEdges"', () =>
      expect(getPageInfo).toHaveBeenCalledWith("nextEdges"));
    it("should call updateRepositoryData once", () =>
      expect(updateRepositoryData).toHaveBeenCalledTimes(1));
    it("should call updateRepositoryData with calculated data", () =>
      expect(updateRepositoryData).toHaveBeenCalledWith(
        "previousEdges",
        [1, 2, 1, 2],
        "New Page"
      ));

    it("should return updated data from updateRepositoryData function", () =>
      expect(result).toBe("New value"));
  });

  describe("when hasn't new edges", () => {
    beforeAll(() => {
      getEdges.mockReturnValue({});
      result = updateQuery(previousResult, currentResult);
    });

    it("should call once getEdges", () =>
      expect(getEdges).toHaveBeenCalledTimes(1));
    it("should call getEdges with 'nextEdges'", () =>
      expect(getEdges).toHaveBeenCalledWith("nextEdges"));
    it("should not call getPageInfo", () =>
      expect(getPageInfo).toHaveBeenCalledTimes(0));
    it("should not call updateRepositoryData", () =>
      expect(updateRepositoryData).toHaveBeenCalledTimes(0));
    it("should return data from previousResult", () =>
      expect(result).toEqual("previousEdges"));
  });
});
