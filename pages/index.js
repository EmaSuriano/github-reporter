import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';
import Header from '../src/screens/Profile/components/Header';
import User from '../src/screens/Profile/components/User';

class App extends Component {
  static propTypes = {
    user: PropTypes.string,
  };

  static defaultProps = {
    user: '',
  };

  // eslint-disable-next-line react/destructuring-assignment
  state = { user: this.props.user };

  static async getInitialProps(ctx) {
    const { user } = ctx.query;

    return {
      user,
    };
  }

  searchProfile = user => this.setState({ user });

  render() {
    console.log(this.props.user);
    const { user } = this.state;

    return (
      <Box pad="small">
        <Header searchProfile={this.searchProfile} query={user} />
        {user ? <User profile={user} /> : <p>Please search for an user!</p>}
      </Box>
    );
  }
}

export default App;
