import React from 'react';
import PropTypes from 'prop-types';
import Error from 'next/error';

export default class ErrorBoundary extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    error: PropTypes.object,
  };

  static defaultProps = {
    error: undefined,
  };

  state = {
    error: this.props.error,
  };

  componentDidCatch(error) {
    this.setState({ error });
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;

    // TODO: Improve error handling by sending proper error code!
    return error ? <Error statusCode={404} /> : children;
  }
}
