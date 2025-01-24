import React from "react";

import { Header } from "@/components";
import { BugBountyPrograms, Events, News, OurCoreTeam, OurCulture, Tagline } from "@/sections";
import { getPageBySlug } from "@/lib";
import { PageBuilder } from "@/components/PageBuilder";
import { BlockType } from "@/types";

const blockComponents: Record<string, React.FC<BlockType>> = {
  hero_section: Header,
  company_who_we_are: BugBountyPrograms,
  company_core_team: OurCoreTeam,
  company_our_culture: OurCulture,
  // company_events: Events,
  // company_latest_insights: News,
  company_connect: Tagline,
};

const CompanyPage: React.FC = async () => {
  const data = await getPageBySlug("company");

  if (!data?.blocks) {
    return null;
  }

  return (
    <main>
      <PageBuilder blockComponents={blockComponents} blocks={data.blocks} />
    </main>
  );
};

export default CompanyPage;
