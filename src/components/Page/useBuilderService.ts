import React, { ReactNode } from "react";

import Hero from "../Blocks/Hero";

interface Block {
  collection: any;
  content: ReactNode;
  id: string;
  type: string;
}

interface Seo {
  canonical_url: string;
  description: string;
  image: { id: string } | null;
  keywords: string[] | null;
  meta_description?: string;
  no_follow: boolean;
  no_index: boolean;
  title: string;
}

interface PageDirectus {
  [key: string]: any;
  blocks: Block[];
  seo: Seo;
}

interface Page {
  pageDirectus: PageDirectus;
}

interface BuilderServiceReturn {
  blocks: Block[];
  componentMap: Record<string, React.ComponentType<any>>;
  pageData: PageDirectus;
  seo: Seo;
}

export const useBuilderService = ({ page }: { page: Page }): BuilderServiceReturn => {
  const componentMapDirectus: Record<string, React.ComponentType<any>> = {
    block_hero: Hero,
  };

  const Directus = {
    pageData: page.pageDirectus,
    blocks: page?.pageDirectus?.blocks || [],
    componentMap: componentMapDirectus,
    seo: page?.pageDirectus?.seo || {},
  };

  const { pageData, blocks, componentMap, seo } = Directus;

  return { pageData, blocks, componentMap, seo };
};
