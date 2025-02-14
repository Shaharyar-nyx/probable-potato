import React from "react";

import { Button } from "@/components";

import "./styles.scss";
import { STRAPI_ASSETS } from "@/lib";
import Image from "next/image";

export const WhyJoin: React.FC<any> = ({ title, content, cta_text, cta_url, cards }) => {
  return (
    <section className="why-join-parent-container">
      <div className="why-join-background" />
      <div className="why-join-container why-join-join-container">
        <div className="w-full lg:w-[32%]">
          <h2 className="heading-1 why-join-title">{title}</h2>
          <p className={`paragraph-md why-join-paragraph`}>{content}</p>
          <Button className="w-[160px]" externalHref={cta_url} target="_blank" variant="neutral">
            {cta_text}
          </Button>
        </div>
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:w-[66%]">
          {cards.map(({ content, icon, title }: any, index: number) => (
            <div key={index} className="why-join-feature-container">
              <div className="flex items-center gap-3">
                <div className="rounded-md bg-primary-500 p-1">
                  <Image
                    src={`${STRAPI_ASSETS}${icon.data.attributes.url}`}
                    alt={icon.data.attributes.name}
                    width={24}
                    height={24}
                  />
                </div>
                <h3 className="heading-7 font-bold text-primary-800">{title}</h3>
              </div>
              <p className="paragraph-md text-primary-800">{content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
