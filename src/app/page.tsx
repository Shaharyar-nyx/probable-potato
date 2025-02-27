import React from "react";

import { Hero, Organization, Partner, Objective, Services, ServiceList, Packages, Faq, CTA } from "@/sections/site";
import { getPageBySlug } from "@/lib";
import { PageBuilder } from "@/components/PageBuilder";
import { BlockType } from "@/types";

const blockComponents: Record<string, React.FC<BlockType>> = {
  hero_section: Hero,
  organization_section: Organization,
  partner_section: Partner,
  objective_section: Objective,
  //service_section: Services,
  package_section: Packages,
  faq_section: Faq,
  cta_section: CTA,
  service_v2_section: ServiceList,
};

const Home: React.FC = async () => {
  const data = await getPageBySlug("home-v2");

  if (!data?.blocks) {
    return null;
  }

  return <main>{<PageBuilder blockComponents={blockComponents} blocks={data.blocks} />}</main>;
};

export default Home;
