import { GET_PAGE_BY_SLUG } from "@/graphql/queries/pages";
import client from "@/lib/apollo-client";

/**
 * Fetches a page by its slug.
 *
 * @param {string} slug The slug of the page to fetch.
 *
 * @returns {Promise<{ page: Page }>} A promise that resolves with an object
 * containing a `page` property with the fetched page data, or `null` if the
 * page could not be found.
 */
export async function getPageBySlug(slug: string | null) {
  try {
    console.log('Fetching page with slug:', slug);
    const response = await client.query({
      query: GET_PAGE_BY_SLUG,
      variables: { slug },
      fetchPolicy: "network-only",
    });

    console.log('Page response:', response);

    if (!response?.data?.pages?.data?.[0]) {
      console.error('No page data found for slug:', slug);
      return null;
    }

    const items = response.data.pages.data[0].attributes;

    return items;
  } catch (error) {
    console.error("Error fetching page data for slug:", slug);
    console.error("Error details:", JSON.stringify(error, null, 2));
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    return null;
  }
}
