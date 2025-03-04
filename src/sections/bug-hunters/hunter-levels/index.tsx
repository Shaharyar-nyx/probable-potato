"use client";

import React from "react";

import "./styles.scss";
import { Button } from "@/components";
import { useIsMobile } from "@/hooks";

export const HunterLevels: React.FC<any> = ({ title, content, headline, cards }) => {
  const isMobile = useIsMobile()
  return (
    <section className="hunter-levels-parent-container">
      <div className="hunter-levels-container">
        <span className="tagline hunter-levels-tagline">{headline}</span>
        <h2 className={`${isMobile ? 'heading-7' : 'heading-1'} hunter-levels-title`}>{title}</h2>
        <p className="paragraph-md hunter-levels-description lg:text-center lg:w-3/4">{content}</p>
        <div className="hunter-levels-feature-container">
          {cards.map(({ title, headline, content, cta_text, cta_url }: any, index: number) => (
            <div key={index} className="flex flex-col items-center">
              <h4 className={`mb-3 text-neutral-50 ${isMobile ? 'paragraph-lg' : 'heading-7'}`}>Level {index + 1}</h4>
              <div className="hunter-levels-feature-item">
                <div className="hunter-levels-feature-title-container">
                  <h3 className={`${isMobile ? 'heading-7' : 'heading-3'} hunter-levels-feature-title`}>{title}</h3>
                </div>
                <div className="hunter-levels-feature-text-container">
                  <div>
                    <p className="paragraph-lg hunter-levels-feature-subtitle">{headline}</p>
                    <p className="paragraph-sm hunter-levels-feature-description hidden lg:block">{content}</p>
                  </div>
                  {cta_text && (
                    <Button variant="neutral" externalHref={cta_url}>
                      {cta_text}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
