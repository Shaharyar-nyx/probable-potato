import React from "react";
import { BlockType } from "@/types";
import { getPageBySlug, STRAPI_ASSETS } from "@/lib";
import { PageBuilder } from "@/components/PageBuilder";
import { Metadata } from "next";
import { HeroDark, OfferingsDark, IntelligenceDark, OurServices, CallToAction } from "@/sections";
import IntelligenceLayersDark from "@/sections/darklab-intelligence/intelligence-layers-dark";
import ResearchSection from "@/sections/darklab-intelligence/research-section";
import { ThreatAlertBar } from "@/sections/home/threat";
import HowWorksSection from "@/sections/darklab-intelligence/how-works-section";

// 🔹 Block components mapping
const blockComponents: Record<string, React.FC<BlockType>> = {
  hero_section: (props) => (
    <>
      <HeroDark {...props} />
      <ThreatAlertBar />
    </>
  ),
  ComponentBlocksOfferingsDark: OfferingsDark,
  ComponentBlocksIntelligenceDark: IntelligenceDark,
  ComponentBlocksHowWorks: HowWorksSection,
  ComponentBlocksCallToActionSection: CallToAction,
  ComponentBlocksIntelligenceLayersDark: IntelligenceLayersDark,
  ComponentBlocksResearchExists: ResearchSection,
};

// 🔹 Fetch data from Strapi
async function getDarkLabResponseData() {
  return getPageBySlug("intelligence");
}

// 🔥 SEO Metadata like other pages
export async function generateMetadata(): Promise<Metadata> {
  const data = await getDarkLabResponseData();

  if (!data?.seo) {
    return {
      title: "Nyxlab – Intelligence",
      description: "",
      openGraph: {
        title: "Nyxlab – Intelligence",
        description: "",
        type: "website",
        siteName: "Nyxlab",
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title: "Nyxlab – Intelligence",
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

// 🔹 MAIN DarkLab Response Page
async function DarkLabResponse() {
  const data = await getDarkLabResponseData();
  console.log("data", data);
  if (!data?.blocks) return null;

  return (
    <main>
      <PageBuilder blockComponents={blockComponents} blocks={data.blocks} />
    </main>
  );
}

export default DarkLabResponse;
