import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { from } from "@apollo/client";

import { removeLastTrailingSlash } from "lib/utils";
import { STRAPI_URL } from "lib";

// Add logging to check Strapi configuration
console.log('Strapi Config:', { url: STRAPI_URL });

if (!STRAPI_URL) {
  throw new Error('Strapi GraphQL URL is not configured. Please check your environment variables.');
}

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
    );
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const httpLink = new HttpLink({
  uri: removeLastTrailingSlash(STRAPI_URL),
  fetchOptions: {
    credentials: "include",
  },
});

// Combine error handling with the HTTP link
const link = from([errorLink, httpLink]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
      errorPolicy: "ignore",
    },
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
  },
});

export default client;
