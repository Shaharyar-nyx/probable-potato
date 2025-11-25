import { GET_FOOTER_NAV, GET_MAIN_NAV } from "@/graphql/queries";
import client from "@/lib/apollo-client";

// Log GraphQL URL on module load
console.log("🔗 Strapi GraphQL URL:", process.env.NEXT_PUBLIC_STRAPI_GRAPHQL_URL);

export async function getMainMenusStrapi() {
  try {
    const response = await client.query({
      query: GET_MAIN_NAV,
      fetchPolicy: "network-only", // Force network request
    });

    console.log("=== MAIN NAV RESPONSE ===");
    console.log("Full response:", JSON.stringify(response.data, null, 2));
    console.log("Header data:", response.data?.header);
    console.log("========================");

    if (!response?.data) {
      console.error("No data in response:", response);
      return { mainNav: null };
    }

    const mainNav = response.data.header?.data?.attributes;
    console.log("Extracted mainNav:", mainNav ? "Found" : "NULL");
    return { mainNav };
  } catch (error) {
    console.error("Error fetching main nav data:");
    console.error("Error details:", JSON.stringify(error, null, 2));
    if (error instanceof Error) {
      console.error("Error message:", error.message);
    }
    return { mainNav: null };
  }
}

export async function getFooterMenusStrapi() {
  try {
    const response = await client.query({
      query: GET_FOOTER_NAV,
      fetchPolicy: "network-only", // Force network request
    });

    console.log("=== FOOTER NAV RESPONSE ===");
    console.log("Full response:", JSON.stringify(response.data, null, 2));
    console.log("Footer data:", response.data?.footer);
    console.log("===========================");

    if (!response?.data) {
      console.error("No data in response:", response);
      return { footerNav: null };
    }

    const footerNav = response.data.footer?.data?.attributes;
    console.log("Extracted footerNav:", footerNav ? "Found" : "NULL");
    return { footerNav };
  } catch (error) {
    console.error("Error fetching footer nav data:");
    console.error("Error details:", JSON.stringify(error, null, 2));
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    return { footerNav: null };
  }
}
