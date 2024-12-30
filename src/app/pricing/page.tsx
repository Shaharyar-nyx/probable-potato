import React from "react";

import Header from "@/components/Blocks/Header";
import Packages from "@/components/Blocks/Packages";
import RequestDemo from "@/components/Blocks/RequestDemo";
import heroData from "@/data/pricing/hero.json";

const Pricing: React.FC = () => {
  return (
    <main>
      <Header {...heroData} />
      <Packages />
      <RequestDemo />
    </main>
  );
};

export default Pricing;
