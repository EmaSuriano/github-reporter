import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import { Grommet } from "grommet";
import "@atlaskit/css-reset";

import Profile from "./screens/Profile";
import client from "./config/apolloConfig";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <Grommet>
    <ApolloProvider client={client}>
      <Profile />
    </ApolloProvider>
  </Grommet>,
  document.getElementById("root")
);
registerServiceWorker();
