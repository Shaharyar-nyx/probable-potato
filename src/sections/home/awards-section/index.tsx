"use client";

import React from "react";
import Image from "next/image";
import { STRAPI_ASSETS } from "@/lib/constants";
import style from "./styles.module.scss";

interface Award {
  Title: string;
  Description?: string;
  Icon?: string;
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
  Label?: string;
  Heading?: string;
  Awards?: Award[];
  [key: string]: any;
}

const AwardsSection: React.FC<AwardsSectionProps> = ({
  Label = "",
  Heading = "",
  Awards = [],
}) => {
  if (!Label && !Heading && (!Awards || Awards.length === 0)) return null;

  const midIndex = Math.ceil(Awards.length / 2);
  const topRowAwards = Awards.slice(0, midIndex);
  const bottomRowAwards = Awards.slice(midIndex);

  const renderAwardCard = (award: Award, index: number, prefix: string) => {
    const logoPath = award.Logo?.data?.attributes?.url;
    const logoUrl = logoPath ? `${STRAPI_ASSETS}${logoPath}` : null;
    const logoAlt =
      award.Logo?.data?.attributes?.alternativeText || award.Title || "Certification";

    return (
      <article
        key={`${prefix}-${index}`}
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

        {award.Title && (
          <p className={style.certTitle}>{award.Title}</p>
        )}
      </article>
    );
  };

  // Render a track (one complete set of cards)
  const renderTrack = (awards: Award[], prefix: string) => (
    <div className={style.track}>
      {awards.map((award, index) => renderAwardCard(award, index, prefix))}
    </div>
  );

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

        {/* Marquee Container */}
        <div className={style.marqueeContainer}>
          {/* Top Row - scrolls left */}
          <div className={style.marqueeRow}>
            <div className={`${style.marqueeContent} ${style.scrollLeft}`}>
              {renderTrack(topRowAwards, "top-1")}
              {renderTrack(topRowAwards, "top-2")}
            </div>
          </div>

          {/* Bottom Row - scrolls right */}
          <div className={style.marqueeRow}>
            <div className={`${style.marqueeContent} ${style.scrollRight}`}>
              {renderTrack(bottomRowAwards, "bottom-1")}
              {renderTrack(bottomRowAwards, "bottom-2")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;
