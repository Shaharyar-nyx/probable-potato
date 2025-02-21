import React from "react";

import { Header } from "@/components";
import { Introduction, Accordion } from "@/sections";
import { PageBuilder } from "@/components/PageBuilder";
import { getPageBySlug, STRAPI_ASSETS } from "@/lib";
import { Metadata } from "next";

const blockComponents: Record<string, React.FC<any>> = {
  hero_section: Header,
  simple_section: Introduction,
  multi_card_section: Accordion,
};

export const data = await getPageBySlug("privacy-policy");

export async function generateMetadata(): Promise<Metadata> {
  if (!data?.seo) {
    return {
      title: "Mercury",
      description: "",
      openGraph: {
        title: "Mercury",
        description: "",
        type: "website",
        siteName: "Mercury",
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title: "Mercury",
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
      siteName: "Mercury",
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

const PrivacyPolicy: React.FC = async () => {
  if (!data?.blocks) {
    return null;
  }

  return (
    <main>
      <PageBuilder blockComponents={blockComponents} blocks={data.blocks} />
    </main>
  );
};

export default PrivacyPolicy;
