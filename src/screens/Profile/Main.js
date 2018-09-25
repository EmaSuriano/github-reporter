import React from "react";
import { number, shape, string } from "prop-types";
import { propOr } from "ramda";
import { Query } from "react-apollo";

import RepositoryInfo from "./components/RepositoryInfo";

import { PROFILE_INFO } from "./query";

const NAME = "wesbos";

const Profile = () => (
  <Query query={PROFILE_INFO} variables={{ name: NAME }}>
    {({ data, error, loading }) => {
      if (loading) return "Loading...";
      if (error) return "Error";

      const { id, login } = propOr({}, "user")(data);
      console.log("Fetch User Data", data);
      return <RepositoryInfo id={id} login={login} />;
    }}
  </Query>
);

Profile.propTypes = {
  avatarUrl: string,
  company: string,
  createdAt: string,
  email: string,
  location: string,
  login: string,
  name: string,
  followers: shape({
    totalCount: number
  }),
  repositories: shape({
    totalCount: number
  }),
  starredRepositories: shape({
    totalCount: number
  })
};

export default Profile;
