import React from "react";
import { string } from "prop-types";
import { compose, pathOr, reduce } from "ramda";
import { Query } from "react-apollo";
import { PulseLoader } from "react-spinners";

import {
  CHART_SM_CONFIGURATION,
  CHART_LG_CONFIGURATION
} from "../../constants";

import { GET_REPOSITORIES_INFORMATION } from "./query";
import updateQuery from "./updateQuery";

import {
  createData,
  getEndCursor,
  getPageInfo,
  getStatistics,
  hasNextPage
} from "../../utils";

import Statistics from "../Statistics";

const RepositoryInfo = ({ id, login }) => (
  <Query query={GET_REPOSITORIES_INFORMATION} variables={{ name: login, id }}>
    {({ data, error, fetchMore, loading }) => {
      if (loading)
        return (
          <PulseLoader
            className="spinner"
            loading={true}
            color="#90C3FF"
            sizeUnit="rem"
            size={5}
            margin="1rem"
          />
        );

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
        updateQuery
      });

      const nextPage = compose(
        hasNextPage,
        getPageInfo
      )(data);

      if (nextPage)
        return (
          <PulseLoader
            className="spinner"
            loading={true}
            color="#90C3FF"
            sizeUnit="rem"
            size={5}
            margin="1rem"
          />
        );

      const dataSet = reduce(
        getStatistics,
        {},
        pathOr([], ["user", "repositories", "edges"], data)
      );

      return (
        <section className="content--container">
          <section className="statistics-by-language">
            <Statistics
              data={createData(dataSet, "languages", "repositories")}
              configuration={CHART_SM_CONFIGURATION}
            />
            <Statistics
              data={createData(dataSet, "languages", "stars")}
              configuration={CHART_SM_CONFIGURATION}
            />
            <Statistics
              data={createData(dataSet, "languages", "commits")}
              configuration={CHART_SM_CONFIGURATION}
            />
          </section>

          <section className="statistics-by-repository">
            <Statistics
              data={createData(dataSet, "repositories", "commits")}
              configuration={CHART_LG_CONFIGURATION}
            />
            <Statistics
              data={createData(dataSet, "repositories", "commits")}
              configuration={CHART_LG_CONFIGURATION}
            />
          </section>
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
