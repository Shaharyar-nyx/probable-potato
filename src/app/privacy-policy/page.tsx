import React from "react";

import { Header } from "@/components";
import privacyData from "@/data/privacy-policy/content.json";
import heroData from "@/data/privacy-policy/hero.json";
import introductionData from "@/data/privacy-policy/introduction.json";
import { Introduction, Accordion } from "@/sections";

const PrivacyPolicy: React.FC = () => {
  return (
    <main>
      <Header {...heroData} />
      <Introduction {...introductionData} />
      <Accordion {...privacyData} />
    </main>
  );
};

export default PrivacyPolicy;
