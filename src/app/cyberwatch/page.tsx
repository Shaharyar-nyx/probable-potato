import React from "react";

import { Header  } from "@/components";
import { BlockType } from "@/types";
import { getPageBySlug, STRAPI_ASSETS } from "@/lib";
import { PageBuilder } from "@/components/PageBuilder";
import { CTA } from "@/sections";
import { WhyCyberWatch , WhatCyberWatch , KeyOutcomes,CyberWatchDeliver} from "@/sections/cyberbaywatch-news";



const blockComponents: Record<string, React.FC<any>> = {
  hero_section: Header,
  ComponentBlocksWhyCyberWatch: WhyCyberWatch,
  ComponentBlocksWhatCyberWatch: WhatCyberWatch,
  ComponentBlocksKeyOutcomes: KeyOutcomes,
  ComponentBlocksCyberWatchDeliver:CyberWatchDeliver,
  single_card_section: CTA,
};

async function CyberbayWatchNews() {
  const data = await getPageBySlug("cyber-watch");
  console.log("Page data:", data);

  if (!data?.blocks) return null;

  return <PageBuilder blockComponents={blockComponents} blocks={data.blocks} />;
}

export default CyberbayWatchNews;
