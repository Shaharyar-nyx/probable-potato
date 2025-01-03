import React from "react";

import { Header } from "@/components";
import heroData from "@/data/bug-hunters/hero.json";
import { Ecosystem, FeaturedHunters, HunterLevels, KeyBenefits, Knowledge, Referral } from "@/sections";

const EthicalHackersPage: React.FC = () => {
  return (
    <main className="relative">
      <Header backgroundImage={heroData.backgroundImage} description={heroData.description} title={heroData.title} />
      <KeyBenefits />
      <Referral />
      <Ecosystem />
      <HunterLevels />
      <FeaturedHunters />
      <Knowledge />
    </main>
  );
};

export default EthicalHackersPage;
