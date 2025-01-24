import React from "react";

import { Header } from "@/components";
import { Introduction, Accordion } from "@/sections";
import { PageBuilder } from "@/components/PageBuilder";
import { getPageBySlug } from "@/lib";

const blockComponents: Record<string, React.FC<any>> = {
  hero_section: Header,
  simple_section: Introduction,
  multi_card_section: Accordion,
};

const PrivacyPolicy: React.FC = async () => {
  const data = await getPageBySlug("privacy-policy");

  if (!data?.blocks) {
    return null;
  }

  return (
    <main>
      <PageBuilder blockComponents={blockComponents} blocks={data.blocks} />
    </main>
  );
};

export default PrivacyPolicy;
