import { assocPath, compose, path, prop, propOr } from "ramda";

const getEdges = path(["user", "repositories", "edges"]);

const getEndCursor = prop("endCursor");

const getPageInfo = path(["user", "repositories", "pageInfo"]);

const hasNextPage = propOr(false, "hasNextPage");

const updateRepositoryData = (repositoryInfo, edges, pageInfo) =>
  compose(
    assocPath(["user", "repositories", "edges"], edges),
    assocPath(["user", "repositories", "pageInfo"], pageInfo)
  )(repositoryInfo);

export {
  getEdges,
  getEndCursor,
  getPageInfo,
  hasNextPage,
  updateRepositoryData
};
