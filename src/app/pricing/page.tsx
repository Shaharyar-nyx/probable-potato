import React from "react";

import { Header } from "@/components";
import { CTA, Packages } from "@/sections";
import { BlockType } from "@/types";
import { getPageBySlug } from "@/lib";
import { PageBuilder } from "@/components/PageBuilder";

const blockComponents: Record<string, React.FC<BlockType>> = {
  hero_section: Header,
  packages_section: Packages,
  single_card_section: CTA,
};
const Pricing: React.FC = async () => {
  const data = await getPageBySlug("pricing");

  if (!data?.blocks) {
    return null;
  }
  return <PageBuilder blockComponents={blockComponents} blocks={data.blocks} />;
};

export default Pricing;
