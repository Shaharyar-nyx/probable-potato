import React from "react";

import "./styles.scss";
import { SemiCircle } from "@/components";
import { STRAPI_ASSETS } from "@/lib";
import Image from "next/image";

export const SecurityPosture: React.FC<any> = ({ title, headline, content, cards }) => {
  return (
    <section className="security-posture-parent-container">
      <div className="security-posture-container">
        <h2 className="heading-1 mb-5 font-bold text-primary-800">{title}</h2>
        <p className="paragraph-xl font-semibold mb-6 text-primary-800">{headline}</p>
        <div className="hidden w-full max-w-screen-xl lg:block">
          <SemiCircle data={cards} text={content} />
        </div>
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3 lg:hidden">
          {cards.map(({ title, content, icon }: any, index: number) => (
            <div key={index} className="flex flex-col gap-6 rounded-xl bg-primary-500 p-5">
              <div className="flex items-start gap-4">
                <Image
                  alt={icon.data.attributes.name}
                  height={24}
                  width={24}
                  src={`${STRAPI_ASSETS}${icon.data.attributes.url}`}
                />
                <h3 className="heading-8 font-bold text-neutral-50">{title}</h3>
              </div>
              <p className="paragraph-sm text-neutral-50">{content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
