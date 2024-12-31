import React from "react";

import { Header } from "@/components";
import heroData from "@/data/bug-hunters/hero.json";
import { KeyBenefits, Referral } from "@/sections";

const EthicalHackersPage: React.FC = () => {
  return (
    <main>
      <Header backgroundImage={heroData.backgroundImage} description={heroData.description} title={heroData.title} />
      <KeyBenefits />
      <Referral />
    </main>
  );
};

export default EthicalHackersPage;
