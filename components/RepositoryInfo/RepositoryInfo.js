import React from 'react';
import { number, string } from 'prop-types';
import { compose, pathOr, reduce } from 'ramda';
import { Query } from 'react-apollo';
import { PulseLoader } from 'react-spinners';
import { GoPin, GoRepo, GoStar } from 'react-icons/go';
import { Box, ResponsiveContext } from 'grommet';
import Fade from 'react-reveal/Fade';

import { GET_REPOSITORIES_INFORMATION } from './query';
import updateQuery from './updateQuery';

import {
  createConfiguration,
  createData,
  getEndCursor,
  getPageInfo,
  getStatistics,
  hasNextPage,
} from '../../utils';
import { getDirection } from '../../utils/helpers';

import ActivityBox from './components/ActivityBox';
import Statistics from './components/Statistics';

const ActivityIcon = ({ Icon, login, tab, ...props }) => (
  <a className="stats--icon" href={`https://github.com/${login}?tab=${tab}`}>
    <Icon size="4rem" {...props} />
  </a>
);

const RepositoryInfo = ({ id, login, pinnedRepositories, repositories, starredRepositories }) => (
  <Query query={GET_REPOSITORIES_INFORMATION} variables={{ name: login, id }}>
    {({ data, error, fetchMore, loading }) => {
      if (loading)
        return (
          <PulseLoader
            className="spinner"
            color="#90C3FF"
            sizeUnit="rem"
            size={5}
            margin="1rem"
            loading
          />
        );

      if (error) return <Error statusCode={error} />;

      const nextPage = compose(
        hasNextPage,
        getPageInfo,
      )(data);

      if (nextPage) {
        fetchMore({
          query: GET_REPOSITORIES_INFORMATION,
          variables: {
            name: login,
            id,
            cursor: compose(
              getEndCursor,
              getPageInfo,
            )(data),
          },
          updateQuery,
        });
      }

      const dataSet = reduce(
        getStatistics,
        {},
        pathOr([], ['user', 'repositories', 'edges'], data),
      );

      return (
        <ResponsiveContext.Consumer>
          {size => (
            <Box align="center" jutify="center" gap="medium" width="full">
              <Fade big>
                <Box direction={getDirection(size)} justify="center" wrap>
                  <ActivityBox
                    icon={<ActivityIcon Icon={GoRepo} login={login} tab="repositories" />}
                    stat={repositories}
                    title="Repositories"
                  />
                  <ActivityBox
                    icon={<ActivityIcon Icon={GoStar} login={login} tab="stars" />}
                    stat={starredRepositories}
                    title="Starred"
                  />
                  <ActivityBox
                    icon={<ActivityIcon Icon={GoPin} login={login} tab="" />}
                    stat={pinnedRepositories}
                    title="Pinned"
                  />
                </Box>
                <Box direction={getDirection(size)} justify="center" wrap>
                  <Statistics
                    id="by-language"
                    title="Repositories per Language"
                    data={createData(dataSet, 'languages', 'repositories')}
                    configuration={createConfiguration(login)}
                  />
                  <Statistics
                    id="by-language"
                    title="Stars per Language"
                    data={createData(dataSet, 'languages', 'stars')}
                    configuration={createConfiguration(login)}
                  />
                  <Statistics
                    id="by-language"
                    title="Commits per Language"
                    data={createData(dataSet, 'languages', 'commits')}
                    configuration={createConfiguration(login)}
                  />
                  <Statistics
                    id="by-repository"
                    title="Stars per Repo Top 10"
                    data={createData(dataSet, 'repositories', 'stars')}
                    configuration={createConfiguration(login, 'bottom')}
                    size="large"
                  />
                  <Statistics
                    id="by-repository"
                    title="Commits per Repo Top 10"
                    data={createData(dataSet, 'repositories', 'commits')}
                    configuration={createConfiguration(login, 'bottom')}
                    size="large"
                  />
                </Box>
              </Fade>
            </Box>
          )}
        </ResponsiveContext.Consumer>
      );
    }}
  </Query>
);

RepositoryInfo.defaultProps = {
  id: '',
  login: '',
};

RepositoryInfo.propTypes = {
  id: string,
  login: string,
  pinnedRepositories: number,
  repositories: number,
  starredRepositories: number,
};

export default RepositoryInfo;
