import React, { Component } from 'react';
import App, { Container } from 'next/app';
import { ApolloProvider } from 'react-apollo';
import { Grommet } from 'grommet';
import { createGlobalStyle } from 'styled-components';
import Fonts from '../components/Fonts';
import theme from '../utils/theme';
import withApolloClient from '../lib/with-apollo-client';

const GlobalStyle = createGlobalStyle`
  * {
    @import url('https://fonts.googleapis.com/css?family=Lato:400,700');
    font-family: 'Lato', sans-serif;
  }
`;

class MyApp extends App {
  componentDidMount() {
    Fonts();
  }

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
