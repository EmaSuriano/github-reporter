import React from "react";
import { number, shape, string } from "prop-types";
import { propOr } from "ramda";
import { Query } from "react-apollo";

import RepositoryInfo from "./components/RepositoryInfo";

import { PROFILE_INFO } from "./query";
import "./styles.css";

const NAME = "wesbos";

const Profile = () => (
  <Query query={PROFILE_INFO} variables={{ name: NAME }}>
    {({ data, error, loading }) => {
      if (loading) return "Loading...";
      if (error) return "Error";

      const { avatarUrl, id, login } = propOr({}, "user")(data);
      console.log("HERE", data);
      return (
        <section className="profile--container">
          <section className="profile--sidebar">
            <img src={avatarUrl} alt="Avatar" className="profile--avatar" />
          </section>
          <section className="profile--content">
            <RepositoryInfo id={id} login={login} />
          </section>
        </section>
      );
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
