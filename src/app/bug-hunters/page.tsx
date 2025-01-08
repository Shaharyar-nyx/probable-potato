import React from "react";

import { Header } from "@/components";
import heroData from "@/data/bug-hunters/hero.json";
import { CTA, Ecosystem, FeaturedHunters, HunterLevels, KeyBenefits, Referral } from "@/sections";

const EthicalHackersPage: React.FC = () => {
  return (
    <main className="relative">
      <Header backgroundImage={heroData.backgroundImage} description={heroData.description} title={heroData.title} />
      <KeyBenefits />
      <Referral />
      <Ecosystem />
      <HunterLevels />
      <FeaturedHunters />
      <CTA
        backgroundImage={{
          src: "/bug-hunters/knowledge/background.webp",
        }}
        cta={{
          label: "Learn More",
          link: "/",
        }}
        description="Discover valuable resources, tutorials, and community insights tailored for bug hunters."
        title="Head to the Knowledge Base to enhance your skills and stay updated on the latest cybersecurity trends."
      />
    </main>
  );
};

export default EthicalHackersPage;
