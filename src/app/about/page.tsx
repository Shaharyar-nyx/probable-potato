import React from "react";
import { getPageBySlug, STRAPI_ASSETS } from "@/lib";
import { PageBuilder } from "@/components/PageBuilder";
import { HeroDark } from "@/sections";
import { ThreatAlertBar } from "@/sections/home/threat";
import AboutSection from "@/sections/darklab-intelligence/content-section";
import { Metadata } from "next";

// 🔹 Fetch data function
async function getAboutPageData() {
  return getPageBySlug("about-us");
}

// 🔥 Add Metadata like Contact Us page
export async function generateMetadata(): Promise<Metadata> {
  const data = await getAboutPageData();

  if (!data?.seo) {
    return {
      title: "Nyxlab – About Us",
      description: "",
      openGraph: {
        title: "Nyxlab – About Us",
        description: "",
        type: "website",
        siteName: "Nyxlab",
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title: "Nyxlab – About Us",
        description: "",
      },
    };
  }

  return {
    title: data.seo.title,
    description: data.seo.meta_description,
    keywords: data.seo.keywords,
    robots: {
      index: !data.seo.no_index,
      follow: !data.seo.no_follow,
    },
    openGraph: {
      title: data.seo.title,
      description: data.seo.meta_description,
      images: [
        {
          url:
            STRAPI_ASSETS +
              data.seo.og_image?.data?.attributes?.url || "/favicon.ico",
        },
      ],
      url: data.seo.canonical_url,
      type: "website",
      siteName: "Nyxlab",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: data.seo.title,
      description: data.seo.meta_description,
      images: [
        STRAPI_ASSETS +
          data.seo.og_image?.data?.attributes?.url || "/favicon.ico",
      ],
    },
  };
}

// 🔹 MAIN ABOUT PAGE
export default async function AboutPage() {
  const data = await getAboutPageData();
  console.log("about page data", data);

  return (
    <main>
      {data?.blocks && (
        <PageBuilder
          blockComponents={{
            hero_section: (props) => (
              <>
                <HeroDark {...props} />
                <ThreatAlertBar />
              </>
            ),
            ComponentBlocksContentSection: AboutSection,
          }}
          blocks={data.blocks}
        />
      )}
    </main>
  );
}
