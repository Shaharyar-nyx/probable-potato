import React from "react";

import { Header } from "@/components";
import Packages from "@/components/Blocks/Packages";
import RequestDemo from "@/components/Blocks/RequestDemo";
import heroData from "@/data/pricing/hero.json";
import CTA from "@/components/Blocks/cta";

const Pricing: React.FC = () => {
  return (
    <main>
      <Header {...heroData} />
      <Packages />
      <CTA
        title="Schedule A Personalized Consultation"
        description="Need help creating a package that best suits your needs? Reach out to schedule a consultation."
        buttonText="Contact Sales"
        href="/contact"
        backgroundImage={{
          src: "/pricing/pricing-cta-bg.webp",
        }}
      />
    </main>
  );
};

export default Pricing;
