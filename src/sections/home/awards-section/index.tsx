"use client";

import React from "react";
import Image from "next/image";
import { STRAPI_ASSETS } from "@/lib/constants";
import style from "./styles.module.scss";

interface Award {
  Title: string;
  Description?: string; // not used in UI but kept for type compatibility
  Icon?: string;        // not used here
  Logo?: {
    data?: {
      attributes?: {
        url?: string;
        alternativeText?: string;
      };
    };
  };
}

interface AwardsSectionProps {
  Label?: string;     // e.g. "Our Certifications"
  Heading?: string;   // short subheading
  Awards?: Award[];
  [key: string]: any;
}

const AwardsSection: React.FC<AwardsSectionProps> = ({
  Label = "",
  Heading = "",
  Awards = [],
}) => {
  if (!Label && !Heading && (!Awards || Awards.length === 0)) return null;

  return (
    <section className={style.awardsSection}>
      <div className={style.bgLayer} />

      <div className={style.inner}>
        {(Label || Heading) && (
          <header className={style.header}>
            {Label && <h2 className={style.heading}>{Label}</h2>}
            {Heading && <p className={style.subheading}>{Heading}</p>}
          </header>
        )}

        <div className={style.grid}>
          {Awards?.map((award, index) => {
            const logoUrl = award.Logo?.data?.attributes?.url
              ? `${STRAPI_ASSETS}${award.Logo.data.attributes.url}`
              : null;
            const logoAlt =
              award.Logo?.data?.attributes?.alternativeText || award.Title;

            return (
              <article
                key={`${award.Title}-${index}`}
                className={style.card}
              >
                {logoUrl && (
                  <div className={style.logoWrap}>
                    <Image
                      src={logoUrl}
                      alt={logoAlt}
                      width={80}
                      height={80}
                      className={style.logo}
                    />
                  </div>
                )}

                {/* Optional short label under the logo */}
                {award.Title && (
                  <p className={style.certTitle}>{award.Title}</p>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;