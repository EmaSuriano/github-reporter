import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import { Grommet } from "grommet";
import "@atlaskit/css-reset";

import Profile from "./screens/Profile";
import client from "./config/apolloConfig";
import registerServiceWorker from "./registerServiceWorker";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    @import url('https://fonts.googleapis.com/css?family=Lato:400,700');
    font-family: 'Lato', sans-serif;
  }
`;

ReactDOM.render(
  <Grommet>
    <ApolloProvider client={client}>
      <GlobalStyle />
      <Profile />
    </ApolloProvider>
  </Grommet>,
  document.getElementById("root")
);
registerServiceWorker();
