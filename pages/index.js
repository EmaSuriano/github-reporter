import React, { Component } from "react";
import { Box } from "grommet";

import Header from "../src/screens/Profile/components/Header";
import User from "../src/screens/Profile/components/User";

export default class Profile extends Component {
  state = { user: window.location.pathname.replace("/", "") };

  searchProfile = user => this.setState({ user });

  render() {
    const { user } = this.state;

    return (
      <Box pad="small">
        <Header searchProfile={this.searchProfile} />
        {user && <User profile={user} />}
      </Box>
    );
  }
}
