import React from "react";

import { Header } from "@/components";
import heroData from "@/data/pricing/hero.json";
import packagesData from "@/data/pricing/packages.json";
import { CTA, Packages } from "@/sections";

const Pricing: React.FC = () => {
  return (
    <main>
      <Header {...heroData} />
      <Packages {...packagesData} />
      <CTA
        backgroundImage={{
          src: "/pricing/pricing-cta-bg.webp",
        }}
        cta={{
          label: "Contact Sales",
          link: "/contact-us",
        }}
        description="Need help creating a package that best suits your needs? Reach out to schedule a consultation."
        title="Schedule A Personalized Consultation"
      />
    </main>
  );
};

export default Pricing;
