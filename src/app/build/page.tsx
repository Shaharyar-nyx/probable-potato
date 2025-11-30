import React from "react";
import { BlockType } from "@/types";
import { getPageBySlug, STRAPI_ASSETS } from "@/lib";
import { PageBuilder } from "@/components/PageBuilder";
import { Metadata } from "next";
import { HeroDark, CallToAction } from "@/sections";
import { ThreatAlertBar } from "@/sections/home/threat";
import ResearchSection from "@/sections/darklab-intelligence/research-section";
import HowWorksSection from "@/sections/darklab-intelligence/how-works-section";
import DarkBrand from "@/sections/darklab-intelligence/dark-brand";

// 🔹 Block components mapping
const blockComponents: Record<string, React.FC<BlockType>> = {
  hero_section: (props) => (
    <>
      <HeroDark {...props} />
      <ThreatAlertBar />
    </>
  ),
  ComponentBlocksResearchExists: ResearchSection,
  ComponentBlocksDarkBrand: DarkBrand,
  ComponentBlocksHowWorks: HowWorksSection,
  ComponentBlocksCallToActionSection: CallToAction,
};

// 🔹 Fetch page data
async function getNyxlabBuildPageData() {
  return getPageBySlug("nyxlab-build");
}

// 🔹 SEO Metadata
export async function generateMetadata(): Promise<Metadata> {
  const data = await getNyxlabBuildPageData();

  if (!data?.seo) {
    return {
      title: "Nyxlab Build",
      description: "",
      openGraph: {
        title: "Nyxlab Build",
        description: "",
        type: "website",
        siteName: "Nyxlab",
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title: "Nyxlab Build",
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

// 🔹 Page Component
async function NyxlabBuildPage() {
  const data = await getNyxlabBuildPageData();
  console.log("nyxlab-build data", data);

  if (!data?.blocks) return null;

  return (
    <main>
      <PageBuilder blockComponents={blockComponents} blocks={data.blocks} />
    </main>
  );
}

export default NyxlabBuildPage;
