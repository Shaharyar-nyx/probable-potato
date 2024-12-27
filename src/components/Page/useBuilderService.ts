import { ReactNode } from "react";
import Hero from "../Blocks/Hero";

interface Block {
  id: string;
  type: string;
  content: ReactNode;
  collection: any;
}

interface Seo {
  image: { id: string } | null;
  title: string;
  description: string;
  meta_description?: string;
  canonical_url: string;
  keywords: string[] | null;
  no_index: boolean;
  no_follow: boolean;
}

interface PageDirectus {
  blocks: Block[];
  seo: Seo;
  [key: string]: any;
}

interface Page {
  pageDirectus: PageDirectus;
}

interface BuilderServiceReturn {
  pageData: PageDirectus;
  blocks: Block[];
  componentMap: Record<string, React.ComponentType<any>>;
  seo: Seo;
}

export const useBuilderService = ({
  page,
}: {
  page: Page;
}): BuilderServiceReturn => {
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
