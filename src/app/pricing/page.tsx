import React from "react";

import { Header } from "@/components";
import heroData from "@/data/pricing/hero.json";
import { CTA, Packages } from "@/sections";

const Pricing: React.FC = () => {
  return (
    <main>
      <Header {...heroData} />
      <Packages />
      <CTA
        backgroundImage={{
          src: "/pricing/pricing-cta-bg.webp",
        }}
        buttonText="Contact Sales"
        description="Need help creating a package that best suits your needs? Reach out to schedule a consultation."
        href="/contact"
        title="Schedule A Personalized Consultation"
      />
    </main>
  );
};

export default Pricing;
