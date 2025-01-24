import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from "@apollo/client";

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_STRAPI_GRAPHQL_URL,
  fetch: (uri, options) => {
    return fetch(uri, {
      ...options,
      headers: {
        ...options?.headers,
      },
    });
  },
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([httpLink]),
  defaultOptions: {
    query: {
      fetchPolicy: "cache-first",
      errorPolicy: "all",
    },
    watchQuery: {
      fetchPolicy: "cache-first",
      errorPolicy: "all",
    },
  },
});

export default client;
