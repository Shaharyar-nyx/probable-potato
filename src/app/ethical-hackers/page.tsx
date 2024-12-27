import React from "react";

import Header from "@/components/Blocks/Header";
import heroData from "@/data/ethical-hackers/hero.json";

const EthicalHackersPage: React.FC = () => {
  return (
    <main>
      <Header backgroundImage={heroData.backgroundImage} description={heroData.description} title={heroData.title} />
    </main>
  );
};

export default EthicalHackersPage;
