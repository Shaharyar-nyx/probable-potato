import { getPageByPermalink } from "lib/pages";
// import Builder from "components/Page/Builder";
import Hero from "@/components/Blocks/Hero";
import BrandMission from "@/components/Blocks/BrandMission";
import Solutions from "@/components/Blocks/Solutions";
import Testimonials from "@/components/Blocks/Testimonials";
import Clients from "@/components/Blocks/Clients";
import RequestDemo from "@/components/Blocks/RequestDemo";
import Layout from "@/layouts/default";

export default function Home({ page }: any) {
  // return <Builder page={page} />;
  return (
    <Layout>
      <Hero />
      <BrandMission />
      <Solutions />
      <Testimonials />
      <Clients />
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
