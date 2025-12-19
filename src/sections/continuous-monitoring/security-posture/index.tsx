"use client";

import React from "react";

import "./styles.scss";
import { SemiCircle } from "@/components";
import { getStrapiAssetUrl } from "@/lib";
import Image from "next/image";
import { useIsMobile } from "@/hooks";

export const SecurityPosture: React.FC<any> = ({ title, headline, content, cards }) => {
  const isMobile = useIsMobile();
  return (
    <section className="security-posture-parent-container">
      <div className="security-posture-container">
        <h2 className={`${isMobile ? 'heading-7' : 'heading-1'} mb-6 lg:mb-5 font-bold text-primary-800`}>{title}</h2>
        <p className={`${isMobile ? 'paragraph-lg' : 'paragraph-xl'} font-semibold mb-6 text-primary-800`}>{headline}</p>
        <div className="hidden w-full max-w-screen-xl lg:block">
          <SemiCircle data={cards} text={content} />
        </div>
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3 lg:hidden">
          <p className="paragraph-md text-primary-800">{content}</p>
          {cards.map(({ title, content, icon }: any, index: number) => (
            <div key={index} className="flex flex-row gap-5 rounded-xl bg-primary-500 p-7">
              <Image
                alt={icon.data.attributes.name}
                height={24}
                width={24}
                src={getStrapiAssetUrl(icon.data.attributes.url)}
                className="brightness-0 invert"
              />
              <div>
                <p className="paragraph-lg mb-1 font-bold text-neutral-50">{title}</p>
                <p className="paragraph-md text-neutral-50">{content}</p>
              </div>
            </div>
          )).reverse()}
        </div>
      </div>
    </section>
  );
};
