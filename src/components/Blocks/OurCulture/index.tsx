import React from "react";

import { Button, IconRenderer } from "@/components";
import { OurCultureProps } from "@/types";

import "./styles.scss";

export const OurCulture: React.FC<OurCultureProps> = ({ title, content, buttonText, coreTitle, features }) => {
  return (
    <section className="relative">
      <div className="our-culture-background" />
      <div className="our-culture-container">
        <div className="w-1/2">
          <h2 className="heading-2 our-culture-title">{title}</h2>
          <p className="paragraph-2 our-culture-paragraph">{content}</p>
          <Button variant="neutral">{buttonText}</Button>
        </div>
        <div className="flex w-1/2 flex-col">
          <h3 className="heading-7 mb-6 text-neutral-50">{coreTitle}</h3>
          <div className="grid grid-cols-2 gap-6">
            {features.map((feature, id) => (
              <div key={id} className="our-culture-feature-container">
                <div className="flex items-center gap-3">
                  <div className="rounded-md bg-neutral-50 p-1">
                    <IconRenderer className="h-[24px] w-[24px] text-primary-500" iconName={feature.icon} />
                  </div>
                  <h3 className="heading-7 text-neutral-50">{feature.title}</h3>
                </div>
                <p className="paragraph-md text-neutral-50">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
