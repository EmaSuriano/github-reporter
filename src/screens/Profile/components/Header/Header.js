import React, { Component, createRef } from "react";
import { func } from "prop-types";
import { Box, ResponsiveContext, Text, TextInput } from "grommet";
import { Search } from "grommet-icons";
import styled from "styled-components";
import Slide from "react-reveal/Slide";

import { getDirection } from "../../utils/helpers";

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
      <Slide top>
        <ResponsiveContext.Consumer>
          {size => (
            <Box
              direction={getDirection(size)}
              align="center"
              justify="start"
              pad={{ horizontal: "medium", vertical: "small" }}
              gap="medium"
            >
              <Box>
                <PageTitle level={1} size="large" weight="bold">
                  Github Reporter
                </PageTitle>
              </Box>
              <Box direction="row" basis="full" align="center" gap="small">
                <Box
                  basis="full"
                  direction="row"
                  align="center"
                  pad={{ horizontal: "small", vertical: "xsmall" }}
                  margin="medium"
                  round="small"
                  border={{
                    side: "all",
                    color: "border"
                  }}
                >
                  <Search onClick={this.handleSearch} />
                  <TextInput
                    type="search"
                    ref={this.inputRef}
                    plain
                    value={this.state.query}
                    onChange={this.handleInput}
                    onKeyPress={this.handleKeyPress}
                    placeholder="Who are you looking for ?"
                  />
                </Box>
              </Box>
            </Box>
          )}
        </ResponsiveContext.Consumer>
      </Slide>
    );
  }
}
