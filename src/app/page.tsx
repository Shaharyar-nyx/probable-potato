import React from "react";

import BrandMission from "@/components/Blocks/BrandMission";
import Clients from "@/components/Blocks/Clients";
import Hero from "@/components/Blocks/Hero";
import RequestDemo from "@/components/Blocks/RequestDemo";
import Solutions from "@/components/Blocks/Solutions";
import Testimonials from "@/components/Blocks/Testimonials";
import CTA from "@/components/Blocks/CTA";

const Home: React.FC = () => {
  return (
    <main>
      <Hero />
      <BrandMission />
      <Solutions />
      <Testimonials />
      <Clients />
      <CTA
        title="Secure Your Digital Future"
        description="Experience the power of proactive cybersecurity tailored to your organization's unique needs."
        buttonText="Request a Demo"
        href="/contact"
        backgroundImage={{
          src: "/images/demo/banner1.png",
        }}
      />
    </main>
  );
};

export default Home;
