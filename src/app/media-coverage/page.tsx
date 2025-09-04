import React from "react";

import { Header } from "@/components";
import { BlockType } from "@/types";
import { getPageBySlug, STRAPI_ASSETS } from "@/lib";
import { PageBuilder } from "@/components/PageBuilder";
import { MediaHighlight } from "@/components";
import { PodcastInterviews } from "@/components";
import { GlobalPressCoverage } from "@/components";



const blockComponents: Record<string, React.FC<BlockType>> = {
  hero_section: Header,
  ComponentBlocksMediaHighlight: MediaHighlight,
  ComponentBlocksPodcastInterview: PodcastInterviews,
  ComponentBlocksGlobalPressCoverage: GlobalPressCoverage,
};



async function getMediaCoverageData() {
  return getPageBySlug("media-coverage");
}



async function MediaCoverage() {
  const data = await getMediaCoverageData();
  console.log("data",data);
  if (!data?.blocks) return null;

  return (
    <main>
      <PageBuilder blockComponents={blockComponents} blocks={data.blocks} />
    </main>
  );
}



export default MediaCoverage;
