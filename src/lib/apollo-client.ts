import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from "@apollo/client";

// Remove trailing slash from Strapi URL to avoid double slashes
const strapiUrl = (process.env.NEXT_PUBLIC_STRAPI_GRAPHQL_URL || "https://shark-app-tmqz4.ondigitalocean.app/graphql").replace(/\/$/, '');

console.log("Apollo Client using URL:", strapiUrl);

const httpLink = new HttpLink({
  uri: strapiUrl,
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
  connectToDevTools: false,
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
