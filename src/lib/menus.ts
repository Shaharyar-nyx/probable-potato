import { GET_FOOTER_NAV, GET_MAIN_NAV } from "@/graphql/queries";
import client from "@/lib/apollo-client";

export async function getMainMenusDirectus() {
  try {
    const data = await client.query({
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
  try {
    const data = await client.query({
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
