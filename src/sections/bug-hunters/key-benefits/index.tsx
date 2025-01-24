import React from "react";

import "./styles.scss";
import { STRAPI_ASSETS } from "@/lib";
import Image from "next/image";

export const KeyBenefits: React.FC<any> = ({ title, content, cards, headline }) => {
  return (
    <section className="key-benefits-parent-container">
      <div className="key-benefits-background" />
      <div className="key-benefits-container key-benefits-benefits-container">
        <span className="tagline key-benefits-tagline">{headline}</span>
        <div className="mb-12">
          <h2 className="heading-1 key-benefits-title">{title}</h2>
          <p className="paragraph-md key-benefits-paragraph">{content}</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {cards.map(({ content, icon, title }: any, index: number) => (
            <div key={index} className="key-benefits-benefit-container">
              <div className="flex items-center gap-3">
                <div className="rounded-md bg-neutral-50 p-1">
                  <Image
                    src={`${STRAPI_ASSETS}${icon.data.attributes.url}`}
                    alt={icon.data.attributes.name}
                    width={24}
                    height={24}
                  />
                </div>
                <h3 className="heading-7 font-bold text-neutral-50">{title}</h3>
              </div>
              <p className="paragraph-md text-neutral-50">{content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
