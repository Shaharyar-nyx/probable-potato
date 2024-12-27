import { GET_HOMEPAGE } from "graphql/queries";
import { getApolloClient } from "lib/apollo-client";

/**
 * Fetches a page by its permalink.
 *
 * @param {string} permalink The permalink of the page to fetch.
 *
 * @returns {Promise<{ page: Page }>} A promise that resolves with an object
 * containing a `page` property with the fetched page data, or `null` if the
 * page could not be found.
 */
export async function getPageByPermalink(permalink) {
  const apolloClient = getApolloClient();

  try {
    const data = await apolloClient.query({
      query: GET_HOMEPAGE,
      variables: { permalink },
    });

    const page = data?.data?.pages?.[0] || null;

    return { page };
  } catch (error) {
    console.error("Error fetching page by permalink:", error);
    return { page: null };
  }
}
