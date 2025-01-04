import React from "react";

import "./styles.scss";
import { Button, IconRenderer } from "@/components";
import data from "@/data/continuous-monitoring/features-and-pricing.json";
import { formatToCurrency } from "@/lib";

export const FeaturesAndPricing: React.FC = () => {
  return (
    <section className="features-and-pricing-parent-container">
      <div className="features-and-pricing-container">
        <h2 className="heading-1 features-and-pricing-title">{data.title}</h2>
        <p className="paragraph-md features-and-pricing-text">{data.text}</p>
        <div className="features-and-pricing-content">
          <div className="features-and-pricing-feature-container">
            {data.features.map((feature) => (
              <div key={feature.id}>
                <h3 className="heading-6 features-and-pricing-feature-title">{feature.title}</h3>
                <div className="features-and-pricing-sub-feature-container">
                  {feature.sub_features.map((subFeature) => (
                    <div key={subFeature.id} className="features-and-pricing-sub-feature-item">
                      <div className="features-and-pricing-sub-feature-icon-container">
                        <IconRenderer className="features-and-pricing-sub-feature-icon" iconName={subFeature.icon} />
                      </div>
                      <div>
                        <h4 className="paragraph-lg features-and-pricing-sub-feature-title">{subFeature.title}</h4>
                        <p className="heading-9 features-and-pricing-sub-feature-text">{subFeature.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="features-and-pricing-card-container">
            <div>
              <div className="features-and-pricing-card-title-container">
                <div className="features-and-pricing-card-icon-container">
                  <IconRenderer className="features-and-pricing-card-icon" iconName={data.card.icon} />
                </div>
                <h3 className="heading-7 features-and-pricing-card-title">{data.card.title}</h3>
              </div>
              <div className="features-and-pricing-card-price-container">
                <span className="heading-1 features-and-pricing-card-price-number">
                  {formatToCurrency(data.card.price.number)}
                </span>
                <span className="paragraph-xs features-and-pricing-card-price-text"> /{data.card.price.type}</span>
              </div>
            </div>
            <p className="paragraph-md features-and-pricing-card-text">{data.card.text}</p>
            <Button className="w-full" iconName={data.card.cta.icon} variant="neutral">
              {data.card.cta.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
