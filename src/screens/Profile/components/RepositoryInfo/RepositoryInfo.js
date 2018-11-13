import React from "react";
import { number, string } from "prop-types";
import { compose, pathOr, reduce } from "ramda";
import { Query } from "react-apollo";
import { PulseLoader } from "react-spinners";
import { GoPin, GoRepo, GoStar } from "react-icons/go";

import { CHART_SM, CHART_LG } from "../../constants";

import { GET_REPOSITORIES_INFORMATION } from "./query";
import updateQuery from "./updateQuery";

import {
  createConfiguration,
  createData,
  getEndCursor,
  getPageInfo,
  getStatistics,
  hasNextPage
} from "../../utils";

import ActivityBox from "./components/ActivityBox";
import ErrorReport from "shared/components/ErrorReport";
import Statistics from "./components/Statistics";

const renderIcon = ({ Icon, login, tab, ...props }) => (
  <a className="stats--icon" href={`https://github.com/${login}?tab=${tab}`}>
    <Icon size="4rem" {...props} />
  </a>
);

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

      if (error) return <ErrorReport />;

      const nextPage = compose(
        hasNextPage,
        getPageInfo
      )(data);

      if (nextPage) {
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
      }

      const dataSet = reduce(
        getStatistics,
        {},
        pathOr([], ["user", "repositories", "edges"], data)
      );

      return (
        <section className="content--container">
          <div>
            <section className="statistics-by-language">
              <Statistics
                id="by-language"
                title="Repositories per Language"
                data={createData(dataSet, "languages", "repositories")}
                configuration={createConfiguration(login, CHART_SM)}
              />
              <Statistics
                id="by-language"
                title="Stars per Language"
                data={createData(dataSet, "languages", "stars")}
                configuration={createConfiguration(login, CHART_SM)}
              />
              <Statistics
                id="by-language"
                title="Commits per Language"
                data={createData(dataSet, "languages", "commits")}
                configuration={createConfiguration(login, CHART_SM)}
              />
            </section>

            <section className="statistics-by-repository">
              <Statistics
                id="by-repository"
                title="Commits per Repo Top 10"
                data={createData(dataSet, "repositories", "stars")}
                configuration={createConfiguration(login, CHART_LG)}
              />
              <Statistics
                id="by-repository"
                title="Stars per Repo Top 10"
                data={createData(dataSet, "repositories", "commits")}
                configuration={createConfiguration(login, CHART_LG)}
              />
            </section>
          </div>
          <section className="statistics-by-activity">
            <ActivityBox
              icon={renderIcon({ Icon: GoRepo, login, tab: "repositories" })}
              stat={repositories}
              title="Repositories"
            />
            <ActivityBox
              icon={renderIcon({ Icon: GoStar, login, tab: "stars" })}
              stat={starredRepositories}
              title="Starred"
            />
            <ActivityBox
              icon={renderIcon({ Icon: GoPin, login, tab: "" })}
              stat={pinnedRepositories}
              title="Pinned"
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
