import React from "react";

import { Header } from "@/components";
import heroData from "@/data/bug-hunters/hero.json";
import { Ecosystem, HunterLevels, KeyBenefits, Referral } from "@/sections";

const EthicalHackersPage: React.FC = () => {
  return (
    <main>
      <Header backgroundImage={heroData.backgroundImage} description={heroData.description} title={heroData.title} />
      <KeyBenefits />
      <Referral />
      <Ecosystem />
      <HunterLevels />
    </main>
  );
};

export default EthicalHackersPage;
