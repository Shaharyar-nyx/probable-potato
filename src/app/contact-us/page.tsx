import React from "react";

import { Header } from "@/components";
import { ContactForm } from "@/sections";
import { BlockType } from "@/types";
import { getPageBySlug } from "@/lib";
import { PageBuilder } from "@/components/PageBuilder";

const blockComponents: Record<string, React.FC<BlockType>> = {
  hero_section: Header,
  simple_section: ContactForm,
};

const ContactUs: React.FC = async () => {
  const data = await getPageBySlug("contact-us");

  if (!data?.blocks) {
    return null;
  }

  return (
    <main>
      <PageBuilder blockComponents={blockComponents} blocks={data.blocks} />
    </main>
  );
};

export default ContactUs;
