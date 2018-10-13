import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import "@atlaskit/css-reset";

import Profile from "./screens/Profile";
import client from "./config/apolloConfig";
import registerServiceWorker from "./registerServiceWorker";

import "./index.css";

ReactDOM.render(
  <ApolloProvider client={client}>
    <Profile />
  </ApolloProvider>,
  document.getElementById("root")
);
registerServiceWorker();
