import React, { Component } from "react";
import { func } from "prop-types";
import { FaSearch } from "react-icons/fa";

export default class Header extends Component {
  static propTypes = {
    searchProfile: func.isRequired
  };

  state = { query: "" };

  handleInput = e => this.setState({ query: e.target.value });

  handleSearch = () => this.props.searchProfile(this.state.query);

  render() {
    return (
      <section className="profile--header">
        <h1 className="header--title">Github Reporter</h1>
        <div className="input-search">
          <input
            type="text"
            placeholder="Who are you looking for ?"
            onChange={this.handleInput}
            value={this.state.query}
          />
          <span className="input-search--button" onClick={this.handleSearch}>
            <FaSearch size="2rem" />
          </span>
        </div>
      </section>
    );
  }
}
