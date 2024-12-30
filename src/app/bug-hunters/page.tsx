import React from "react";

import Header from "@/components/Blocks/Header";
import heroData from "@/data/bug-hunters/hero.json";
import { KeyBenefits } from "@/sections";

const EthicalHackersPage: React.FC = () => {
  return (
    <main>
      <Header backgroundImage={heroData.backgroundImage} description={heroData.description} title={heroData.title} />
      <KeyBenefits />
    </main>
  );
};

export default EthicalHackersPage;
