import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { removeLastTrailingSlash } from "lib/util";
import getConfig from "next/config";

let client;

/**
 * getApolloClient
 */
export function getApolloClient() {
  if (!client) {
    client = _createApolloClient();
  }
  return client;
}

/**
 * _createApolloClient
 */
export function _createApolloClient() {
  const { publicRuntimeConfig } = getConfig();
  const { Directus } = publicRuntimeConfig;

  const directusLink = new HttpLink({
    uri: removeLastTrailingSlash(Directus.url),
    fetchOptions: {
      credentials: 'include',
    },
    onError: ({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      }
      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
      }
    },
  });

  const splitLink = split(({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "query" &&
      definition.name?.value.startsWith("Directus")
    );
  }, directusLink);

  return new ApolloClient({
    link: splitLink,
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
      mutate: {
        errorPolicy: "all",
      },
    },
    connectToDevTools: true,
  });
}
