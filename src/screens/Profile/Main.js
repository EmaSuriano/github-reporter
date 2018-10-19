import React from "react";
import { number, shape, string } from "prop-types";
import { propOr } from "ramda";
import { Query } from "react-apollo";
import { PulseLoader } from "react-spinners";

import Header from "./components/Header";
import RepositoryInfo from "./components/RepositoryInfo";
import Sidebar from "./components/Sidebar";

import { PROFILE_INFO } from "./query";

import { getFollowers, getFollowing } from "./utils";

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

      const { avatarUrl, bio, id, login, followers, following } = propOr(
        {},
        "user"
      )(data);

      console.log("HERE", data);

      return (
        <section className="container">
          <Header />
          <section className="profile--content">
            <Sidebar
              avatar={avatarUrl}
              bio={bio}
              followers={getFollowers(followers)}
              following={getFollowing(following)}
            />
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
