import React, { Component, createRef } from "react";
import { func } from "prop-types";
import { FaSearch } from "react-icons/fa";
import { Box, Text } from "grommet";
import styled from "styled-components";

const PageTitle = styled(Text)`
  letter-spacing: 0.3rem;
  text-transform: uppercase;
`;
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
      <React.Fragment>
        <Box basis="1/3">
          <PageTitle level={1} size="xxlarge" weight="bold">
            Github Reporter
          </PageTitle>
        </Box>
        <Box direction="row" basis="full" align="center" gap="small">
          <Box basis="full">
            <input
              ref={this.inputRef}
              type="text"
              placeholder="Who are you looking for ?"
              onChange={this.handleInput}
              onKeyPress={this.handleKeyPress}
              value={this.state.query}
            />
          </Box>
          <FaSearch size="2rem" onClick={this.handleSearch} />
        </Box>
      </React.Fragment>
    );
  }
}
