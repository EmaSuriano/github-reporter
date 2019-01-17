import React from 'react';
import App, { Container } from 'next/app';
import { ApolloProvider } from 'react-apollo';
import { Grommet } from 'grommet';
import { createGlobalStyle } from 'styled-components';
import theme from '../src/theme';
import buildClient from '../src/config/apolloConfig';

const GlobalStyle = createGlobalStyle`
  * {
    @import url('https://fonts.googleapis.com/css?family=Lato:400,700');
    font-family: 'Lato', sans-serif;
  }
`;

export default class MyApp extends App {
  static async getInitialProps() {
    return { githubToken: process.env.REACT_APP_GITHUB_TOKEN };
  }

  render() {
    const { Component, pageProps, githubToken } = this.props;

    return (
      <Container>
        <Grommet theme={theme} full>
          <ApolloProvider client={buildClient(githubToken)}>
            <GlobalStyle />
            <Component {...pageProps} />
          </ApolloProvider>
        </Grommet>
      </Container>
    );
  }
}
