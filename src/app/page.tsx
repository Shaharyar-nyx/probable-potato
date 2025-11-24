import React from "react";
import type { Metadata } from "next";

import { Hero, Testimonials, TestimonialDarksSection, StatsSection, CaseStudies, OurServices, ThreatLevel, CallToAction } from "@/sections";
import { getPageBySlug, STRAPI_ASSETS } from "@/lib";
import { PageBuilder } from "@/components/PageBuilder";
import { BlockType } from "@/types";
import AwardsSection from "@/sections/home/awards-section";
import { ThreatAlertBar } from "@/sections/home/threat";


const blockComponents: Record<string, React.FC<BlockType>> = {
  hero_section: (props) => (
    <>
      <Hero {...props} />
      <ThreatAlertBar />
    </>
  ),
  ComponentBlocksOurServices: OurServices,
  ComponentBlocksTestimonialsSection: TestimonialDarksSection,
  ComponentBlocksAwardsSection: AwardsSection,
  ComponentBlocksCallToActionSection: CallToAction,
};


async function getHomeData() {
  return getPageBySlug(null);
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getHomeData();
  if (!data?.seo) {
    return {
      title: "Nyxlab",
      description: "",
      openGraph: {
        title: "Nyxlab",
        description: "",
        type: "website",
        siteName: "Nyxlab",
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title: "Nyxlab",
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
      images: [{ url: STRAPI_ASSETS + data.seo.og_image?.data?.attributes?.url || "/favicon.ico" }],
      url: data.seo.canonical_url,
      type: "website",
      siteName: "Nyxlab",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: data.seo.title,
      description: data.seo.meta_description,
      images: [STRAPI_ASSETS + data.seo.og_image?.data?.attributes?.url || "/favicon.ico"],
    },
  };
}

async function Home() {
  const data = await getHomeData();
  if (!data?.blocks) {
    return null;
  }

  return (
    <main>
      <PageBuilder blockComponents={blockComponents} blocks={data.blocks} />
    </main>
  );
}

export default Home;
