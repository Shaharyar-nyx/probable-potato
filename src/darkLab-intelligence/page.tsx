import React from "react";

import { BlockType } from "@/types";
import { getPageBySlug, STRAPI_ASSETS } from "@/lib";
import { PageBuilder } from "@/components/PageBuilder";
import { Metadata } from "next";
import { HeroDark , OfferingsDark} from "@/sections";

const blockComponents: Record<string, React.FC<BlockType>> = {
  hero_section:HeroDark,
  ComponentBlocksOfferingsDark: OfferingsDark,
  
};



async function getDarkLabIntelligenceData() {
  return getPageBySlug("dark-lab-intelligence");
}


async function DarkLabIntelligence() {
  const data = await getDarkLabIntelligenceData();
  console.log("data",data);
  if (!data?.blocks) return null;

  return (
    <main>
      <PageBuilder blockComponents={blockComponents} blocks={data.blocks} />
    </main>
  );
}



export default DarkLabIntelligence;
