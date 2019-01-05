import React, { Component } from "react";
import { isEmpty } from "ramda";
import { Box, Grid } from "grommet";

import Header from "./components/Header";
import User from "./components/User";

import "./styles.css";

export default class Profile extends Component {
  state = { user: "" };

  searchProfile = user => this.setState({ user });

  render() {
    const {
      searchProfile,
      state: { user }
    } = this;

    return (
      <Grid
        areas={[
          { name: "header", start: [0, 0], end: [1, 1] },
          { name: "sidebar", start: [0, 1], end: [0, 1] },
          { name: "main", start: [1, 1], end: [1, 1] }
        ]}
        fill
        rows={["flex", "flex"]}
        columns={["flex", "flex"]}
      >
        <Box
          basis="medium"
          columns={["large", "auto"]}
          gridArea="header"
          direction="row"
          align="center"
          justify="start"
          pad={{ horizontal: "medium", vertical: "small" }}
        >
          <Header searchProfile={searchProfile} />
        </Box>
        <Box
          gridArea="sidebar"
          width="small"
          animation={[
            { type: "fadeIn", duration: 300 },
            { type: "slideRight", size: "xlarge", duration: 150 }
          ]}
        >
          Second Box
        </Box>
        <Box gridArea="main" justify="center" align="center">
          Third Box
        </Box>
      </Grid>
    );

    /* return (
      <section className="container">
        <Header searchProfile={searchProfile} />
        {!isEmpty(user) && <User profile={user} />}
      </section>
    ); */
  }
}
