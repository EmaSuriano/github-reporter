import React, { Component, createRef } from 'react';
import { func, string } from 'prop-types';
import { Box, Button, Text, ResponsiveContext, TextInput } from 'grommet';
import { Search } from 'grommet-icons';
import styled from 'styled-components';
import Slide from 'react-reveal/Slide';

import { getDirection } from '../../utils/helpers';

const PageTitle = styled(Text)`
  letter-spacing: 0.3rem;
  text-transform: uppercase;
`;
export default class Header extends Component {
  static propTypes = {
    searchProfile: func.isRequired,
    query: string,
  };

  static defaultProps = {
    query: '',
  };

  inputRef = createRef();

  state = { query: this.props.query };

  componentDidMount() {
    const { query } = this.props;
    if (!query) this.inputRef.current.focus();
  }

  handleInput = e => this.setState({ query: e.target.value });

  handleSearch = () => this.props.searchProfile(this.state.query);

  handleKeyPress = e => e.key === 'Enter' && this.handleSearch();

  render() {
    const { query } = this.state;

    return (
      <Slide top>
        <ResponsiveContext.Consumer>
          {size => (
            <Box
              direction={getDirection(size)}
              align="center"
              justify="start"
              pad={{ horizontal: 'medium', vertical: 'small' }}
              gap="medium"
            >
              <Button href="/">
                <PageTitle level={1} size="large" weight="bold">
                  Github Reporter
                </PageTitle>
              </Button>
              <Box direction="row" basis="full" align="center" gap="small">
                <Box
                  basis="full"
                  direction="row"
                  align="center"
                  pad={{ horizontal: 'small', vertical: 'xsmall' }}
                  margin="medium"
                  round="small"
                  border={{
                    side: 'all',
                    color: 'border',
                  }}
                >
                  <Search onClick={this.handleSearch} />
                  <TextInput
                    type="search"
                    ref={this.inputRef}
                    plain
                    value={query}
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
