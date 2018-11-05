import {
  add,
  assocPath,
  compose,
  filter,
  inc,
  keys,
  map,
  path,
  pathOr,
  prop,
  propOr,
  reduce,
  sort,
  take,
  values
} from "ramda";

import {
  removeEmpties,
  removeLowerThan,
  sortingByParam,
  transformStatistics
} from "./helpers";

import { DEFAULT_COLORS, MIN_LANGUAGES } from "../constants";

const addCommits = (key, commits) => add(commits, propOr(0, "commits")(key));

const addRepository = language =>
  inc(prop("repositories", language)) || MIN_LANGUAGES;

const addStars = (key, stars) => add(stars, propOr(0, "stars")(key));

const createData = (data, from, currentProp) => {
  const { labels, values } = getInfo(prop(from, data), currentProp);
  return {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: DEFAULT_COLORS
      }
    ]
  };
};

const generateDataSet = data => ({
  labels: keys(data),
  values: values(data)
});

const getCommits = pathOr(0, [
  "node",
  "masterBranch",
  "target",
  "history",
  "totalCount"
]);

const getEdges = path(["user", "repositories", "edges"]);

const getEndCursor = prop("endCursor");

const getInfo = (data, param) =>
  compose(
    generateDataSet,
    removeEmpties,
    map(prop(param)),
    reduce(transformStatistics(data), {}),
    take(10),
    sort(sortingByParam(data, param)),
    filter(removeLowerThan(data, param, 0)),
    keys
  )(data);

const getLanguage = pathOr("Unknown", ["node", "primaryLanguage", "name"]);

const getPageInfo = path(["user", "repositories", "pageInfo"]);

const getRepository = path(["node", "name"]);

const getStars = pathOr(0, ["node", "stargazers", "totalCount"]);

const getStatistics = (accumulator, edge) => {
  const language = getLanguage(edge);
  const repository = getRepository(edge);
  const currentLanguage = path(["languages", language], accumulator);
  const currentRepository = path(["repositories", repository], accumulator);
  const commits = getCommits(edge);
  const stars = getStars(edge);

  return {
    ...accumulator,
    repositories: {
      ...accumulator.repositories,
      [repository]: {
        ...currentRepository,
        ...(!hasForked(edge) && {
          commits: addCommits(currentRepository, commits),
          stars: addStars(currentRepository, stars)
        })
      }
    },
    languages: {
      ...accumulator.languages,
      [language]: {
        ...currentLanguage,
        commits: addCommits(currentLanguage, commits),
        ...(!hasForked(edge) && {
          repositories: addRepository(currentLanguage),
          stars: addStars(currentLanguage, stars)
        })
      }
    }
  };
};

const getTotalCount = propOr(0, "totalCount");

const hasForked = path(["node", "isFork"]);

const hasNextPage = propOr(false, "hasNextPage");

const updateRepositoryData = (repositoryInfo, edges, pageInfo) =>
  compose(
    assocPath(getEdges, edges),
    assocPath(["user", "repositories", "pageInfo"], pageInfo)
  )(repositoryInfo);

export {
  createData,
  getEdges,
  getEndCursor,
  getPageInfo,
  getStatistics,
  getTotalCount,
  hasNextPage,
  updateRepositoryData
};
