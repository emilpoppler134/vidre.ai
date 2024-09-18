import { ApolloProvider } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom/client";
import client from "./clients/graphql";
import Routes from "./routes";

import "./assets/index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  </React.StrictMode>,
);
