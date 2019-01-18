import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';
import Header from '../components/Header';
import User from '../components/User';
import ErrorBoundary from '../components/ErrorBoundary';

class App extends Component {
  static propTypes = {
    user: PropTypes.string,
    error: PropTypes.object,
  };

  static defaultProps = {
    user: '',
    error: undefined,
  };

  static async getInitialProps({ query }) {
    return {
      user: query.user,
    };
  }

  // eslint-disable-next-line react/destructuring-assignment
  state = { user: this.props.user };

  searchProfile = user => this.setState({ user });

  render() {
    const { user } = this.state;
    const { error } = this.props;

    return (
      <Box pad="small">
        <Header searchProfile={this.searchProfile} query={user} />
        <ErrorBoundary error={error}>
          {user ? <User profile={user} /> : <p>Please search for an user!</p>}
        </ErrorBoundary>
      </Box>
    );
  }
}

export default App;
