import React, { Component } from "react";
import { isEmpty } from "ramda";

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
      <section className="container">
        <Header searchProfile={searchProfile} />
        {!isEmpty(user) && <User profile={user} />}
      </section>
    );
  }
}
