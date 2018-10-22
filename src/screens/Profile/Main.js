import React from "react";
import { number, shape, string } from "prop-types";
import { propOr } from "ramda";
import { Query } from "react-apollo";
import { PulseLoader } from "react-spinners";

import Header from "./components/Header";
import RepositoryInfo from "./components/RepositoryInfo";
import Sidebar from "./components/Sidebar";

import { PROFILE_INFO } from "./query";

import { getTotalCount } from "./utils";

import "./styles.css";

const NAME = "wesbos";

const Profile = () => (
  <Query query={PROFILE_INFO} variables={{ name: NAME }}>
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

      if (error) return "Error";

      const {
        avatarUrl,
        bio,
        followers,
        following,
        id,
        login,
        name,
        pinnedRepositories,
        repositories,
        starredRepositories
      } = propOr({}, "user")(data);

      console.log("HERE", data);

      return (
        <section className="container">
          <Header />
          <section className="profile--content">
            <Sidebar
              avatar={avatarUrl}
              bio={bio}
              followers={getTotalCount(followers)}
              following={getTotalCount(following)}
              name={name}
            />
            <RepositoryInfo
              id={id}
              login={login}
              repositories={getTotalCount(repositories)}
              starredRepositories={getTotalCount(starredRepositories)}
              pinnedRepositories={getTotalCount(pinnedRepositories)}
            />
          </section>
        </section>
      );
    }}
  </Query>
);

Profile.propTypes = {
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
  repositories: shape({
    totalCount: number
  }),
  starredRepositories: shape({
    totalCount: number
  })
};

export default Profile;
