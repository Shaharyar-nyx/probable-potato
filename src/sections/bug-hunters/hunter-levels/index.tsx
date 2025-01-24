import React from "react";

import "./styles.scss";
import { Button } from "@/components";

export const HunterLevels: React.FC<any> = ({ title, content, headline, cards }) => {
  return (
    <section className="hunter-levels-parent-container">
      <div className="hunter-levels-container">
        <span className="tagline hunter-levels-tagline">{headline}</span>
        <h2 className="heading-1 hunter-levels-title">{title}</h2>
        <p className="paragraph-md hunter-levels-description">{content}</p>
        <div className="hunter-levels-feature-container">
          {cards.map(({ title, headline, content, cta_text, cta_url }: any, index: number) => (
            <div key={index} className="hunter-levels-feature-item">
              <div className="hunter-levels-feature-title-container">
                <h3 className="heading-3 hunter-levels-feature-title">{title}</h3>
              </div>
              <div className="hunter-levels-feature-text-container">
                <div>
                  <p className="paragraph-lg hunter-levels-feature-subtitle">{headline}</p>
                  <p className="paragraph-md hunter-levels-feature-description">{content}</p>
                </div>
                {cta_text && (
                  <Button variant="neutral" externalHref={cta_url}>
                    {cta_text}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
