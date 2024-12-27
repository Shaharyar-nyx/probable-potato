import { getApolloClient } from "lib/apollo-client";
import { GET_FOOTER_NAV, GET_MAIN_NAV } from "graphql/queries";

export async function getMainMenusDirectus() {
  const apolloClient = getApolloClient();

  try {
    const data = await apolloClient.query({
      query: GET_MAIN_NAV,
    });

    const mainNav = data?.data.navigation[0] || [];

    return { mainNav };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      menus: [],
    };
  }
}

export async function getFooterMenusDirectus() {
  const apolloClient = getApolloClient();

  try {
    const data = await apolloClient.query({
      query: GET_FOOTER_NAV,
    });

    const footerNav = data?.data.navigation[0] || [];

    return { footerNav };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      menus: [],
    };
  }
}
