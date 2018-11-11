import React, { Component, createRef } from "react";
import { func } from "prop-types";
import { FaSearch } from "react-icons/fa";

export default class Header extends Component {
  static propTypes = {
    searchProfile: func.isRequired
  };

  constructor(props) {
    super(props);
    this.inputRef = createRef();
  }

  componentDidMount() {
    this.inputRef.current.focus();
  }

  state = { query: "" };

  handleInput = e => this.setState({ query: e.target.value });

  handleSearch = () => this.props.searchProfile(this.state.query);

  handleKeyPress = e => e.key === "Enter" && this.handleSearch();

  render() {
    return (
      <section className="profile--header">
        <h1 className="header--title">Github Reporter</h1>
        <div className="input-search">
          <input
            ref={this.inputRef}
            type="text"
            placeholder="Who are you looking for ?"
            onChange={this.handleInput}
            onKeyPress={this.handleKeyPress}
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
