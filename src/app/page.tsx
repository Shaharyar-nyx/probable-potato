import React from "react";

import { Hero, BrandMission, Solutions, Testimonials, Clients, CTA } from "@/sections";
import { getPageBySlug } from "@/lib";
import { PageBuilder } from "@/components/PageBuilder";
import { BlockType } from "@/types";
import { CrowdSourcing } from "@/sections/home/crowdsourcing";

const blockComponents: Record<string, React.FC<BlockType>> = {
  hero_section: Hero,
  home_intro: BrandMission,
  home_cybersecurity_solutions: Solutions,
  home_scaling_cybersecurity: CrowdSourcing,
  home_testimonial: Testimonials,
  industry_leaders_section: Clients,
  single_card_section: CTA,
};

const Home: React.FC = async () => {
  const data = await getPageBySlug(null);

  if (!data?.blocks) {
    return null;
  }

  return (
    <main>
      <PageBuilder blockComponents={blockComponents} blocks={data.blocks} />
    </main>
  );
};

export default Home;
