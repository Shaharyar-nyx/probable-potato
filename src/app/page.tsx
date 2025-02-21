import React from "react";
import type { Metadata } from "next";

import { Hero, BrandMission, Solutions, Testimonials, Clients, CTA } from "@/sections";
import { getPageBySlug, STRAPI_ASSETS } from "@/lib";
import { PageBuilder } from "@/components/PageBuilder";
import { BlockType } from "@/types";
import { CrowdSourcing } from "@/sections/home/crowdsourcing";

const blockComponents: Record<string, React.FC<BlockType>> = {
  hero_section: Hero,
  home_intro: BrandMission,
  home_cybersecurity_solutions: Solutions,
  home_scaling_cybersecurity: CrowdSourcing,
  // home_testimonial: Testimonials,
  industry_leaders_section: Clients,
  single_card_section: CTA,
};

async function getHomeData() {
  return getPageBySlug(null);
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getHomeData();
  if (!data?.seo) {
    return {
      title: "Cyberbay",
      description: "",
      openGraph: {
        title: "Cyberbay",
        description: "",
        type: "website",
        siteName: "Cyberbay",
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title: "Cyberbay",
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
      siteName: "Cyberbay",
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
};

export default Home;
