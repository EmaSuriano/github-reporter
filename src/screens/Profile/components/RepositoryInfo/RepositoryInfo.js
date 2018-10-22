import React from "react";
import { number, string } from "prop-types";
import { compose, pathOr, reduce } from "ramda";
import { Query } from "react-apollo";
import { PulseLoader } from "react-spinners";
import { GoPin, GoRepo, GoStar } from "react-icons/go";

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

import ActivityBox from "../ActivityBox";
import Statistics from "../Statistics";

const RepositoryInfo = ({
  id,
  login,
  pinnedRepositories,
  repositories,
  starredRepositories
}) => (
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
          <section className="statistics-by-activity">
            <div className="activity--chart">Chart</div>
            <ActivityBox
              icon={<GoRepo className="stats--icon" size="4rem" />}
              stat={repositories}
              title="Repositories"
            />
            <ActivityBox
              icon={<GoStar className="stats--icon" size="4rem" />}
              stat={starredRepositories}
              title="Starred"
            />
            <ActivityBox
              icon={<GoPin className="stats--icon" size="4rem" />}
              stat={pinnedRepositories}
              title="Pinned"
            />
          </section>

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
  login: string,
  pinnedRepositories: number,
  repositories: number,
  starredRepositories: number
};

export default RepositoryInfo;
