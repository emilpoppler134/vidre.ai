import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { GRAPHQL_API_ENDPOINT } from "../config";
import { getAccessToken } from "../utils/token-storage";

const httpLink = createHttpLink({
  uri: GRAPHQL_API_ENDPOINT,
});

const authLink = setContext((_, { headers }) => {
  const token = getAccessToken();
  return token == null
    ? {}
    : { headers: { ...headers, authorization: `Bearer ${token}` } };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }

  if (
    graphQLErrors &&
    graphQLErrors.some(
      (error) =>
        error.extensions?.code === "UNAUTHENTICATED" ||
        error.extensions?.code === "FORBIDDEN",
    )
  ) {
    window.location.href = "/";
  }
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  defaultOptions: {
    mutate: {
      errorPolicy: "none",
    },
  },
});

export default client;
