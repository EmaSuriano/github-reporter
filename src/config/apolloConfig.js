import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { concat } from "ramda";
import { setContext } from "apollo-link-context";

const httpLink = new HttpLink({ uri: "https://api.github.com/graphql" });

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`
  }
}));

const link = concat(authLink, httpLink);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

export default client;
