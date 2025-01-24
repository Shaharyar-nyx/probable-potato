import React from "react";

import { Header } from "@/components";
import { ApplicationForm, Benefits, Clients, JobOpenings } from "@/sections";
import { BlockType } from "@/types";
import { PageBuilder } from "@/components/PageBuilder";
import { getPageBySlug } from "@/lib";

const blockComponents: Record<string, React.FC<BlockType>> = {
  hero_section: Header,
  career_next_move: ApplicationForm,
  career_benefits: Benefits,
  // career_open_positions: JobOpenings,
  industry_leaders_section: Clients,
};

const CareersPage: React.FC = async () => {
  const data = await getPageBySlug("careers");

  if (!data?.blocks) {
    return null;
  }

  return (
    <main>
      <PageBuilder blockComponents={blockComponents} blocks={data.blocks} />
    </main>
  );
};

export default CareersPage;
