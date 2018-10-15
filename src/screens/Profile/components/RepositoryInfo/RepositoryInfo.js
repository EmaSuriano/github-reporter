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
import { DEFAULT_COLORS } from "../../constants";
import {
  CHART_SM_CONFIGURATION,
  CHART_LG_CONFIGURATION
} from "../../constants";

const generateDataForTable = (data, currentProp) => {
  const { labels, values } = getInfo(prop("languages", data), currentProp);
  return {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: DEFAULT_COLORS,
        pointStyle: "circle"
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
        backgroundColor: DEFAULT_COLORS
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
        <section className="statistics--content">
          <div className="statistics--extras">
            <div className="graphic-info statistics--box">1</div>
            <div className="statistics-followers statistics--box">
              <h1>Followers</h1>
              <span>11132</span>
            </div>
            <div className="statistics-repositories statistics--box">
              <h1>Followers</h1>
              <span>11132</span>
            </div>
            <div className="statistics-starred statistics--box">
              <h1>Followers</h1>
              <span>11132</span>
            </div>
          </div>
          <div className="statistics--by-language">
            <Statistics
              data={generateDataForTable(dataSet, "repositories")}
              configuration={CHART_SM_CONFIGURATION}
            />
            <Statistics
              data={generateDataForTable(dataSet, "stars")}
              configuration={CHART_SM_CONFIGURATION}
            />
            <Statistics
              data={generateDataForTable(dataSet, "commits")}
              configuration={CHART_SM_CONFIGURATION}
            />
          </div>
          <div className="statistics--by-repository">
            <Statistics
              data={generateDataForRepositoriesTable(dataSet, "commits")}
              configuration={CHART_LG_CONFIGURATION}
            />
            <Statistics
              data={generateDataForRepositoriesTable(dataSet, "commits")}
              configuration={CHART_LG_CONFIGURATION}
            />
          </div>
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
