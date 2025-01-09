import React from "react";

import { Header } from "@/components";
import heroData from "@/data/bug-hunters/hero.json";
import knowledgeData from "@/data/bug-hunters/knowledge.json";
import { CTA, Ecosystem, FeaturedHunters, HunterLevels, KeyBenefits, Referral } from "@/sections";

const EthicalHackersPage: React.FC = () => {
  return (
    <main className="relative">
      <Header {...heroData} />
      <KeyBenefits />
      <Referral />
      <Ecosystem />
      <HunterLevels />
      <FeaturedHunters />
      <CTA
        backgroundImage={{
          src: knowledgeData.background,
        }}
        cta={knowledgeData.cta}
        description={knowledgeData.text}
        title={knowledgeData.title}
      />
    </main>
  );
};

export default EthicalHackersPage;
