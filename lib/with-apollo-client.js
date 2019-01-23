import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { getDataFromTree } from 'react-apollo';
import initApollo from './init-apollo';

export default App => {
  return class Apollo extends React.Component {
    static propTypes = {
      // eslint-disable-next-line react/forbid-prop-types
      apolloState: PropTypes.object.isRequired,
    };

    static displayName = 'withApollo(App)';

    static async getInitialProps(ctx) {
      const { Component, router } = ctx;

      let appProps = {};
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx);
      }

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      const apollo = initApollo();
      let error;
      if (!process.browser) {
        try {
          // Run all GraphQL queries
          await getDataFromTree(
            <App {...appProps} Component={Component} router={router} apolloClient={apollo} />,
          );
        } catch (err) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
          error = err;
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();
      }

      // Extract query data from the Apollo store
      const apolloState = apollo.cache.extract();

      return {
        ...appProps,
        apolloState,
        error,
      };
    }

    apolloClient = initApollo(this.props.apolloState);

    render() {
      return <App {...this.props} apolloClient={this.apolloClient} />;
    }
  };
};
