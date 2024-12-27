import Header from "@/components/Blocks/Header";
import Packages from "@/components/Blocks/Packages";
import RequestDemo from "@/components/Blocks/RequestDemo";
import Layout from "@/layouts/default";
import { getPageByPermalink } from "lib/pages";

export default function Pricing({ page }: any) {
  return (
    <Layout>
      <Header />
      <Packages />
      <RequestDemo />
    </Layout>
  );
}

export async function getStaticProps() {
  let page;

  try {
    // Fetch data for the Directus page at the root URI
    const result = await getPageByPermalink("/");

    // Construct the page object
    page = {
      pageDirectus: result.page,
    };

    // Check if the page object is empty
    const isPageEmpty = !Object.keys(page.pageDirectus).length;

    if (isPageEmpty) {
      return { notFound: true };
    }

    return {
      props: { page },
      revalidate: 20,
    };
  } catch (error) {
    console.error("Error fetching page data:", error);
    return {
      props: { page: {} },
      revalidate: 20,
    };
  }
}
