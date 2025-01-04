import React from "react";

import { Header } from "@/components";
import heroData from "@/data/continuous-monitoring/hero.json";
import { Why, HarnessAi } from "@/sections";

const ContinuousMonitoringPage: React.FC = () => {
  return (
    <main className="relative">
      <Header
        backgroundImage={heroData.backgroundImage}
        cta={heroData.cta}
        description={heroData.description}
        title={heroData.title}
      />
      <Why />
      <HarnessAi />
    </main>
  );
};

export default ContinuousMonitoringPage;
