import React from "react";

import { BlockType } from "@/types";
import { getPageBySlug ,STRAPI_ASSETS } from "@/lib";
import { PageBuilder } from "@/components/PageBuilder";
import { Metadata } from "next";
import {
    HeroDark,
} from "@/sections";
import { ThreatAlertBar } from "@/sections/home/threat";
import ResearchSection from "@/sections/darklab-intelligence/research-section";
import IntelligenceLayersDark from "@/sections/darklab-intelligence/intelligence-layers-dark";
import ResearchImpact from "@/sections/darklab-intelligence/research-impact";
import DarkBrand from "@/sections/darklab-intelligence/dark-brand";
import FaqSection from "@/sections/darklab-intelligence/faqs";
import { IntelligenceDark } from "@/sections";
import { CallToAction } from "@/sections";
import HowWorksSection from "@/sections/darklab-intelligence/how-works-section";

// ✅ Components map
const blockComponents: Record<string, React.FC<BlockType>> = {
    hero_section: (props) => (
        <>
            <HeroDark {...props} />
            <ThreatAlertBar />
        </>
    ),
    // ✅ Rename to match Strapi typenames

    ComponentBlocksResearchImpact: ResearchImpact,
    ComponentBlocksIntelligenceLayersDark: IntelligenceLayersDark,
    ComponentBlocksResearchExists: ResearchSection,
    ComponentBlocksIntelligenceDark: IntelligenceDark,
    ComponentBlocksHowWorks: HowWorksSection,
    ComponentBlocksCallToActionSection: CallToAction,
    ComponentBlocksDarkBrand: DarkBrand,
    ComponentBlocksBlocksFaq: FaqSection,

};

// ✅ Fetch data from Strapi (slug: "nyxlab-defense")
async function getNyxlabDefensePageData() {
    return getPageBySlug("nyxlab-defense");
}
// 🔹 SEO Metadata
export async function generateMetadata(): Promise<Metadata> {
  const data = await getNyxlabDefensePageData();

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
async function NyxlabDefensePage() {
    const data = await getNyxlabDefensePageData();
    console.log("nyxlab-defense data", data);

    if (!data?.blocks) return null;

    return (
        <main>
            <PageBuilder blockComponents={blockComponents} blocks={data.blocks} />
        </main>
    );
}

export default NyxlabDefensePage;
