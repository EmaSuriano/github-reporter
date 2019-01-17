import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { concat } from 'ramda';
import { setContext } from 'apollo-link-context';
import fetch from 'node-fetch';

const httpLink = new HttpLink({ uri: 'https://api.github.com/graphql', fetch });

const buildClient = githubToken => {
  console.log(`Bearer ${githubToken}`);

  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      authorization: `Bearer ${githubToken}`,
    },
  }));

  const link = concat(authLink, httpLink);

  const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });

  return client;
};

export default buildClient;
