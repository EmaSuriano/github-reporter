import React from "react";
import { number, shape, string } from "prop-types";
import { propOr } from "ramda";
import { Query } from "react-apollo";
import { PulseLoader } from "react-spinners";
import { Box, ResponsiveContext } from "grommet";
import styled from "styled-components";

import { PROFILE_INFO } from "./query";

import ErrorReport from "shared/components/ErrorReport";
import RepositoryInfo from "../RepositoryInfo";
import Sidebar from "../Sidebar";

import { getTotalCount } from "../../utils";
import { getDirection } from "../../utils/helpers";

const Wrapper = styled(Box)`
  background-color: #fafafa;
  border-radius: 0.5rem;
  box-shadow: inset 0px 5px 25px 5px rgba(240, 240, 240, 0.75);
`;

const User = ({ profile }) => (
  <Query query={PROFILE_INFO} variables={{ name: profile }}>
    {({ data, error, loading }) => {
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

      const {
        avatarUrl,
        bio,
        company,
        createdAt,
        email,
        followers,
        following,
        id,
        location,
        login,
        name,
        pinnedRepositories,
        repositories,
        starredRepositories
      } = propOr({}, "user")(data);

      return (
        <ResponsiveContext.Consumer>
          {size => (
            <Wrapper direction={getDirection(size)} gap="small" pad="small">
              <Box responsive>
                <Sidebar
                  avatar={avatarUrl}
                  bio={bio}
                  company={company}
                  createdAt={createdAt}
                  email={email}
                  followers={getTotalCount(followers)}
                  following={getTotalCount(following)}
                  location={location}
                  name={name}
                />
              </Box>
              <Box responsive align="center" width="full">
                <RepositoryInfo
                  id={id}
                  login={login}
                  repositories={getTotalCount(repositories)}
                  starredRepositories={getTotalCount(starredRepositories)}
                  pinnedRepositories={getTotalCount(pinnedRepositories)}
                />
              </Box>
            </Wrapper>
          )}
        </ResponsiveContext.Consumer>
      );
    }}
  </Query>
);

User.propTypes = {
  avatarUrl: string,
  bio: string,
  company: string,
  createdAt: string,
  email: string,
  location: string,
  login: string,
  name: string,
  followers: shape({
    totalCount: number
  }),
  pinnedRepositories: shape({
    totalCount: number
  }),
  profile: string.isRequired,
  repositories: shape({
    totalCount: number
  }),
  starredRepositories: shape({
    totalCount: number
  })
};

export default User;
