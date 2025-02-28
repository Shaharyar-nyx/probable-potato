"use client";

import React from "react";

import "./styles.scss";
import { STRAPI_ASSETS } from "@/lib";
import Image from "next/image";
import { useIsMobile } from "@/hooks";

export const KeyBenefits: React.FC<any> = ({ title, content, cards, headline }) => {
  const isMobile = useIsMobile();
  return (
    <section className="key-benefits-parent-container">
      <div className="key-benefits-background" />
      <div className="key-benefits-container key-benefits-benefits-container">
        <span className={`${isMobile ? "paragraph-md" : "tagline"} key-benefits-tagline`}>{headline}</span>
        <div className="lg:mb-12">
          <h2 className={`${isMobile ? "heading-7" : "heading-1"} key-benefits-title`}>{title}</h2>
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
                <h3 className={`${isMobile ? "heading-8" : "heading-7"} font-bold text-neutral-50`}>{title}</h3>
              </div>
              <p className={`${isMobile ? "paragraph-lg" : "paragraph-md"} text-neutral-50`}>{content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
