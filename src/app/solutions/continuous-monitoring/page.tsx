import React from "react";

import { Header } from "@/components";
import { Why, HarnessAi, SecurityPosture, Packages } from "@/sections";
import { getPageBySlug, STRAPI_ASSETS } from "@/lib";
import { PageBuilder } from "@/components/PageBuilder";
import { Metadata } from "next";

const blockComponents: Record<string, React.FC<any>> = {
  hero_section: Header,
  cm_why_essential: Why,
  cm_strengthen_security: SecurityPosture,
  cm_harness_ai: HarnessAi,
  packages_section: Packages,
};

async function getMonitoringData() {
  return getPageBySlug("continuous-monitoring");
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getMonitoringData();
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

async function ContinuousMonitoringPage() {
  const data = await getMonitoringData();
  if (!data?.blocks) {
    return null;
  }

  return (
    <main>
      <PageBuilder blockComponents={blockComponents} blocks={data.blocks} />
    </main>
  );
};

export default ContinuousMonitoringPage;
