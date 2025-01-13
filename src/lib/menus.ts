import { GET_FOOTER_NAV, GET_MAIN_NAV } from "@/graphql/queries";
import client from "@/lib/apollo-client";

export async function getMainMenusStrapi() {
  try {
    const response = await client.query({
      query: GET_MAIN_NAV,
      fetchPolicy: "network-only", // Force network request
    });

    if (!response?.data) {
      console.error("No data in response:", response);
      return { mainNav: null };
    }

    const mainNav = response.data.header?.data?.attributes;
    return { mainNav };
  } catch (error) {
    console.error("Error fetching main nav data:", error);
    return { mainNav: null };
  }
}

export async function getFooterMenusStrapi() {
  try {
    const response = await client.query({
      query: GET_FOOTER_NAV,
      fetchPolicy: "network-only", // Force network request
    });

    if (!response?.data) {
      console.error("No data in response:", response);
      return { footerNav: null };
    }

    const footerNav = response.data.footer?.data?.attributes;
    return { footerNav };
  } catch (error) {
    console.error("Error fetching footer nav data:", error);
    return { footerNav: null };
  }
}
