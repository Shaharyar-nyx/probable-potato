import React from "react";

import { BlockType } from "@/types";
import { getPageBySlug ,STRAPI_ASSETS } from "@/lib";
import { PageBuilder } from "@/components/PageBuilder";
import { Metadata } from "next";
import {
  HeroDark,
    CallToAction,
      StatsSection,

} from "@/sections";
import { ThreatAlertBar } from "@/sections/home/threat";
import IntelligenceLayersDark from "@/sections/darklab-intelligence/intelligence-layers-dark";
import ResearchImpact from "@/sections/darklab-intelligence/research-impact";

// ✅ Components map
const blockComponents: Record<string, React.FC<BlockType>> = {
  hero_section: (props) => (
    <>
      <HeroDark {...props} />
      <ThreatAlertBar />
    </>
  ),
      ComponentBlocksIntelligenceLayersDark: IntelligenceLayersDark,
        ComponentBlocksResearchImpact: ResearchImpact,
            ComponentBlocksAchivement: StatsSection,
        
            ComponentBlocksCallToActionSection: CallToAction,
        
};

// ✅ Fetch data from Strapi (slug: "nyxlab-response")
async function getNyxlabResponsePageData() {
  return getPageBySlug("nyxlab-response");
}
// 🔹 SEO Metadata
export async function generateMetadata(): Promise<Metadata> {
  const data = await getNyxlabResponsePageData();

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

// ✅ Page component
async function NyxlabResponsePage() {
  const data = await getNyxlabResponsePageData();
  console.log("nyxlab-response data", data);

  if (!data?.blocks) return null;

  return (
    <main>
      <PageBuilder blockComponents={blockComponents} blocks={data.blocks} />
    </main>
  );
}

export default NyxlabResponsePage;
