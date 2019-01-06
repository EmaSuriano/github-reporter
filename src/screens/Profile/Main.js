import React, { Component } from "react";
import { isEmpty } from "ramda";
import { Box, Grid } from "grommet";
import styled from "styled-components";

import Header from "./components/Header";
import User from "./components/User";

import "./styles.css";

const Wrapper = styled(Grid)`
  padding: 1rem;
`;

export default class Profile extends Component {
  state = { user: "" };

  searchProfile = user => this.setState({ user });

  render() {
    const {
      searchProfile,
      state: { user }
    } = this;

    return (
      <Wrapper
        areas={[
          { name: "header", start: [0, 0], end: [1, 0] },
          { name: "sidebar", start: [0, 1], end: [0, 1] },
          { name: "main", start: [1, 1], end: [1, 1] }
        ]}
        fill
        rows={["auto", "flex"]}
        columns={["auto", "flex"]}
      >
        <Box
          responsive
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
        {!isEmpty(user) && <User profile={user} />}
      </Wrapper>
    );

    /* return (
      <section className="container">
        <Header searchProfile={searchProfile} />
        {!isEmpty(user) && <User profile={user} />}
      </section>
    ); */
  }
}
