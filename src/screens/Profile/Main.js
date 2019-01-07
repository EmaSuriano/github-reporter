import React, { Component } from "react";
import { isEmpty } from "ramda";
import { Box, Grid, ResponsiveContext } from "grommet";
import styled from "styled-components";

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
      <Box pad="small">
        <ResponsiveContext.Consumer>
          {size => (
            <Box
              responsive
              direction={size === "small" ? "column" : "row"}
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
