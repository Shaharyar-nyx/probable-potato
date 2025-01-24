import React from "react";

import "./styles.scss";
import Modal from "@/components/UI/modal";
import { DemoForm } from "@/sections/home";
import { STRAPI_ASSETS } from "@/lib";
import Image from "next/image";

export const HarnessAi: React.FC<any> = ({ title, headline, content, cards, cta_text }) => {
  return (
    <section className="harness-ai-parent-container">
      <div className="harness-ai-container">
        <span className="tagline harness-ai-tagline">{headline}</span>
        <h2 className="heading-1 harness-ai-title">{title}</h2>
        <p className="paragraph-md harness-ai-text">{content}</p>
        <div className="harness-ai-feature-container">
          {cards.map(({ title, icon }: any, index: number) => (
            <div key={index} className="harness-ai-feature-item">
              <Image
                alt={icon.data.attributes.name}
                height={45}
                width={45}
                src={`${STRAPI_ASSETS}${icon.data.attributes.url}`}
              />
              <p className="paragraph-md harness-ai-feature-text">{title}</p>
            </div>
          ))}
        </div>
        <Modal
          buttonSize="large"
          buttonStyle="mx-auto"
          buttonTransparent
          cta={{ label: cta_text, icon: "ArrowUpRightIcon" }}
        >
          <DemoForm />
        </Modal>
      </div>
    </section>
  );
};
