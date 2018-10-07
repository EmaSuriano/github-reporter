import React from "react";
import { compose, concat, isEmpty, pathOr, prop, reduce } from "ramda";
import { Query } from "react-apollo";
import { Doughnut } from "react-chartjs-2";

import { GET_REPOSITORIES_INFORMATION } from "./query";
import {
  getEdges,
  getEndCursor,
  getLabels,
  getDataSet,
  getInfo,
  getPageInfo,
  getStatistics,
  hasNextPage,
  updateRepositoryData
} from "../../utils";

const options = {
  maintainAspectRatio: false
};

const configuration = {
  height: 250,
  width: 450,
  options
};

const generateDataForTable = (data, currentProp) => {
  const info = getInfo(prop("languages", data), currentProp);
  return {
    labels: getLabels(info),
    datasets: [
      {
        data: getDataSet(info),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FFAAAA", "#36A2EB", "#FFCE56"]
      }
    ]
  };
};

const generateDataForRepositoriesTable = (data, currentProp) => {
  const info = getInfo(prop("repositories", data), currentProp);
  return {
    labels: getLabels(info),
    datasets: [
      {
        data: getDataSet(info),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FFAAAA", "#36A2EB", "#FFCE56"]
      }
    ]
  };
};

const RepositoryInfo = ({ id, login }) => (
  <Query query={GET_REPOSITORIES_INFORMATION} variables={{ name: login, id }}>
    {({ data, error, fetchMore, loading }) => {
      if (loading) return "Loading..";
      if (error) return "Error";

      fetchMore({
        query: GET_REPOSITORIES_INFORMATION,
        variables: {
          name: login,
          id,
          cursor: compose(
            getEndCursor,
            getPageInfo
          )(data)
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const oldEdges = getEdges(previousResult);
          const newEdges = getEdges(fetchMoreResult);
          const pageInfo = getPageInfo(fetchMoreResult);
          const edges = concat(oldEdges, newEdges);
          const updatedData = updateRepositoryData(
            previousResult,
            edges,
            pageInfo
          );

          return isEmpty(newEdges) ? previousResult : updatedData;
        }
      });

      const nextPage = compose(
        hasNextPage,
        getPageInfo
      )(data);

      if (nextPage) return "Analyzing Profile";

      const dataSet = reduce(
        getStatistics,
        {},
        pathOr([], ["user", "repositories", "edges"], data)
      );

      console.log("HERE", dataSet);

      return (
        <section>
          <div>
            <h1>Repos Per Language</h1>
            <Doughnut
              data={generateDataForTable(dataSet, "repositories")}
              {...configuration}
            />
          </div>

          <div>
            <h1>Stars Per Language</h1>
            <Doughnut
              data={generateDataForTable(dataSet, "stars")}
              {...configuration}
            />
          </div>

          <div>
            <h1>Commits Per Language</h1>
            <Doughnut
              data={generateDataForTable(dataSet, "commits")}
              {...configuration}
            />
          </div>

          <div>
            <h1>Commits Per Repo (Top 10)</h1>
            <Doughnut
              data={generateDataForRepositoriesTable(dataSet, "commits")}
              {...configuration}
            />
          </div>

          <div>
            <h1>Stars Per Repo (Top 10)</h1>
            <Doughnut
              data={generateDataForRepositoriesTable(dataSet, "stars")}
              {...configuration}
            />
          </div>
        </section>
      );
    }}
  </Query>
);

export default RepositoryInfo;
