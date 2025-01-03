import React from "react";

import { Header } from "@/components";
import heroData from "@/data/contact-us/hero.json";
import { ContactForm } from "@/sections";

const ContactUs: React.FC = () => {
  return (
    <main>
      <Header {...heroData} />
      <ContactForm />
    </main>
  );
};

export default ContactUs;
