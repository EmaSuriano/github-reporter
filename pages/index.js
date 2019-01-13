import React, { Component } from "react";
import { Box } from "grommet";
import Header from "../src/screens/Profile/components/Header";
import User from "../src/screens/Profile/components/User";

class App extends Component {
  state = { user: this.props.user };

  static async getInitialProps(ctx) {
    const { user } = ctx.query;

    return {
      user
    };
  }

  searchProfile = user => this.setState({ user });

  render() {
    const { user } = this.state;
    console.log(user);
    return (
      <Box pad="small">
        <Header searchProfile={this.searchProfile} />
        {user && <User profile={user} />}
      </Box>
    );
  }
}

export default App;
