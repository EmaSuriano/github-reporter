import React, { Component } from "react";
import { isEmpty } from "ramda";
import { Box, ResponsiveContext } from "grommet";

import Header from "./components/Header";
import User from "./components/User";

import { getDirection } from "./utils/helpers";

export default class Profile extends Component {
  state = { user: window.location.pathname.replace("/", "") };

  searchProfile = user => this.setState({ user });

  render() {
    const {
      searchProfile,
      state: { user }
    } = this;

    return (
      <Box pad="small">
        <ResponsiveContext.Consumer>
          {size => (
            <Box
              responsive
              direction={getDirection(size)}
              align="center"
              justify="start"
              pad={{ horizontal: "medium", vertical: "small" }}
              gap="medium"
            >
              <Header searchProfile={searchProfile} />
            </Box>
          )}
        </ResponsiveContext.Consumer>
        {!isEmpty(user) && <User profile={user} />}
      </Box>
    );
  }
}
