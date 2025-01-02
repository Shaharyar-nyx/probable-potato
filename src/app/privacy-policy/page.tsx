import React from "react";

import { Header } from "@/components";
import Accordion from "@/components/Blocks/Accordion";
import privacyContent from "@/data/privacy-policy/content.json";
import heroData from "@/data/privacy-policy/hero.json";

const PrivacyPolicy: React.FC = () => {
  return (
    <main>
      <Header {...heroData} />
      <div className="mx-auto max-w-[1440px] px-16 py-10 text-primary-800">
        <h2 className="heading-2 mb-5">Introduction</h2>
        <p>
          Cyberbay is strongly committed to protecting personal information. This Statement explains what information we
          gather about you, what we use that information for, and who we give that information to. It also sets out your
          rights in relation to your information and who you can contact for more information or queries. “Cyberbay”,
          “we”, “us” and “our” refer to Reimagine CyberBay Limited.
        </p>
        <p className="mt-4 font-bold">
          Click on the links in our index below to take you to the more detailed sections of this Statement.{" "}
        </p>
      </div>
      <Accordion items={privacyContent.items} />
    </main>
  );
};

export default PrivacyPolicy;
