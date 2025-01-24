import React from "react";

import { Header } from "@/components";
import { CTA, Ecosystem, FeaturedHunters, HunterLevels, KeyBenefits, Referral, WhyJoin } from "@/sections";
import { BlockType } from "@/types";
import { getPageBySlug } from "@/lib";
import { PageBuilder } from "@/components/PageBuilder";

const blockComponents: Record<string, React.FC<BlockType>> = {
  hero_section: Header,
  bh_why_bughunters_join: WhyJoin,
  bh_key_benefits: KeyBenefits,
  bh_referral_program: Referral,
  bh_how_it_works_1: Referral,
  bh_building_ecosystem: Ecosystem,
  bh_levels: HunterLevels,
  bh_featured_hunters: FeaturedHunters,
  single_card_section: CTA,
};

const EthicalHackersPage: React.FC = async () => {
  const data = await getPageBySlug("bug-hunters");

  if (!data?.blocks) {
    return null;
  }

  return (
    <main>
      <PageBuilder blockComponents={blockComponents} blocks={data.blocks} />
    </main>
  );
};

export default EthicalHackersPage;
