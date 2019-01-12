import React, { Component } from "react";
import { isEmpty } from "ramda";
import { Box } from "grommet";

import Header from "./components/Header";
import User from "./components/User";

export default class Profile extends Component {
  state = { user: "" };

  searchProfile = user => this.setState({ user });

  render() {
    const {
      searchProfile,
      state: { user }
    } = this;

    return (
      <Box pad="small">
        <Header searchProfile={searchProfile} />
        {!isEmpty(user) && <User profile={user} />}
      </Box>
    );
  }
}
