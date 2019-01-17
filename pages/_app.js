import React from 'react';
import App, { Container } from 'next/app';
import { ApolloProvider } from 'react-apollo';
import { Grommet } from 'grommet';
import { createGlobalStyle } from 'styled-components';
// import buildClient from '../src/config/apolloConfig';
import theme from '../src/theme';
import withApolloClient from '../lib/with-apollo-client';
import ErrorBoundary from '../components/ErrorBoundary';

const GlobalStyle = createGlobalStyle`
  * {
    @import url('https://fonts.googleapis.com/css?family=Lato:400,700');
    font-family: 'Lato', sans-serif;
  }
`;

class MyApp extends App {
  // static async getInitialProps({ Component, router, ctx }) {
  //   let pageProps = {};

  //   if (Component.getInitialProps) {
  //     pageProps = await Component.getInitialProps(ctx);
  //   }

  //   return { pageProps };
  // }

  render() {
    const { Component, pageProps, apolloClient, error } = this.props;

    return (
      <Container>
        <Grommet theme={theme} full>
          <ApolloProvider client={apolloClient}>
            <GlobalStyle />
            <Component {...pageProps} error={error} />
          </ApolloProvider>
        </Grommet>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);
