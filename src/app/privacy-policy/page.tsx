import React from "react";

import Header from "@/components/Blocks/Header";
import heroData from "@/data/privacy-policy/hero.json";

const PrivacyPolicy: React.FC = () => {
  return (
    <main>
      <Header {...heroData} />
    </main>
  );
};

export default PrivacyPolicy;
