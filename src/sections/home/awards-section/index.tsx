"use client";

import React, { useEffect, useState } from "react";
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
  const [animationKey, setAnimationKey] = useState(0);

  // Re-start marquee animation on resize
  useEffect(() => {
    const handleResize = () => {
      setAnimationKey((prev) => prev + 1);
    };

    // extra safety in case this ever gets rendered in a non-browser env
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }

    return undefined;
  }, []);

  if (!Label && !Heading && (!Awards || Awards.length === 0)) return null;

  const midIndex = Math.ceil(Awards.length / 2);
  const topRowAwards = Awards.slice(0, midIndex);
  const bottomRowAwards = Awards.slice(midIndex);

  // small helper so we don’t repeat the same logic twice
  const renderAwardCard = (award: Award, index: number, prefix: "top" | "bottom") => {
    const logoPath = award.Logo?.data?.attributes?.url;
    const logoUrl = logoPath ? `${STRAPI_ASSETS}${logoPath}` : null;
    const logoAlt =
      award.Logo?.data?.attributes?.alternativeText || award.Title || "Certification";

    return (
      <article
        key={`${prefix}-${award.Title || "cert"}-${index}`}
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
        <div className={style.marqueeContainer} key={animationKey}>
          {/* Top Row */}
          <div className={`${style.marqueeRow} ${style.topRow}`}>
            <div className={style.marqueeContent}>
              {[...topRowAwards, ...topRowAwards].map((award, index) =>
                renderAwardCard(award, index, "top")
              )}
            </div>
          </div>

          {/* Bottom Row */}
          <div className={`${style.marqueeRow} ${style.bottomRow}`}>
            <div className={style.marqueeContent}>
              {[...bottomRowAwards, ...bottomRowAwards].map((award, index) =>
                renderAwardCard(award, index, "bottom")
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;