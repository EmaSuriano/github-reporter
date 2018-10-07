import React from "react";
import { string } from "prop-types";
import { compose, concat, isEmpty, pathOr, prop, reduce } from "ramda";
import { Query } from "react-apollo";

import { GET_REPOSITORIES_INFORMATION } from "./query";
import {
  getEdges,
  getEndCursor,
  getInfo,
  getPageInfo,
  getStatistics,
  hasNextPage,
  updateRepositoryData
} from "../../utils";
import Statistics from "../Statistics/Statistics";

const generateDataForTable = (data, currentProp) => {
  const { labels, values } = getInfo(prop("languages", data), currentProp);
  return {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FFAAAA", "#36A2EB", "#FFCE56"]
      }
    ]
  };
};

const generateDataForRepositoriesTable = (data, currentProp) => {
  const { labels, values } = getInfo(prop("repositories", data), currentProp);
  return {
    labels,
    datasets: [
      {
        data: values,
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

          console.log("HERE", fetchMoreResult);

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

      return (
        <section>
          <Statistics data={generateDataForTable(dataSet, "repositories")} />
          <Statistics data={generateDataForTable(dataSet, "stars")} />
          <Statistics data={generateDataForTable(dataSet, "commits")} />
          <Statistics
            data={generateDataForRepositoriesTable(dataSet, "commits")}
          />
          <Statistics
            data={generateDataForRepositoriesTable(dataSet, "stars")}
          />
        </section>
      );
    }}
  </Query>
);

RepositoryInfo.defaultProps = {
  id: "",
  login: ""
};

RepositoryInfo.propTypes = {
  id: string,
  login: string
};

export default RepositoryInfo;
