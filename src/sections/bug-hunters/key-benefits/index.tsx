import React from "react";

import { Button, IconRenderer } from "@/components";
import benefitsData from "@/data/bug-hunters/benefits.json";
import joinData from "@/data/bug-hunters/join.json";

import "./styles.scss";

export const KeyBenefits: React.FC = () => {
  return (
    <section className="relative">
      <div className="key-benefits-background" />
      <div className="key-benefits-container key-benefits-join-container">
        <div className="w-[32%]">
          <h2 className={`heading-2 key-benefits-title`}>{joinData.title}</h2>
          <p className={`paragraph-2 key-benefits-paragraph`}>{joinData.text}</p>
          <Button className="w-[160px]" variant="neutral">
            Join Now!
          </Button>
        </div>
        <div className="grid w-[66%] grid-cols-2 gap-6">
          {joinData.features.map((feature) => (
            <div key={feature.id} className="key-benefits-feature-container">
              <div className="flex items-center gap-3">
                <div className="rounded-md bg-primary-500 p-1">
                  <IconRenderer className="h-4 w-4 text-neutral-50" iconName={feature.icon} />
                </div>
                <h3 className="heading-7 font-bold text-primary-800">{feature.title}</h3>
              </div>
              <p className="paragraph-md text-primary-800">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={`key-benefits-container key-benefits-benefits-container`}>
        <span className="tagline key-benefits-tagline">{benefitsData.tagline}</span>
        <div className="mb-12">
          <h2 className="heading-2 key-benefits-title">{benefitsData.title}</h2>
          <p className="paragraph-2 key-benefits-paragraph">{benefitsData.text}</p>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {benefitsData.features.map((feature) => (
            <div key={feature.id} className="key-benefits-benefit-container">
              <div className="flex items-center gap-3">
                <div className="rounded-md bg-neutral-50 p-1">
                  <IconRenderer className="h-4 w-4 text-primary-800" iconName={feature.icon} />
                </div>
                <h3 className="heading-7 font-bold text-neutral-50">{feature.title}</h3>
              </div>
              <p className="paragraph-md text-neutral-50">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
