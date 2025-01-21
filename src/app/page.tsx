import React from "react";

import brandMissionContent from "@/data/home/brand-mission.json";
import clientsContent from "@/data/home/clients.json";
import heroContent from "@/data/home/hero.json";
import solutionsContent from "@/data/home/solutions.json";
import testimonialsContent from "@/data/home/testimonials.json";
import { Hero, BrandMission, Solutions, Testimonials, Clients, CTA } from "@/sections";
import { getPageBySlug } from "@/lib";
import { PageBuilder } from "@/components/PageBuilder";
import { BlockType } from "@/types";

const blockComponents: Record<string, React.FC<BlockType>> = {
  hero_section: Hero,
  home_intro: BrandMission,
  home_cybersecurity_solutions: Solutions,
  home_scaling_cybersecurity: Solutions,
  // testimonials: Testimonials,
  // clients: Clients,
  // cta: CTA,
};

const Home: React.FC = async () => {
  const data = await getPageBySlug(null);
  console.log(data, 'xxx');

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
