"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { STRAPI_ASSETS } from "@/lib/constants";
import * as LucideIcons from "lucide-react";
import style from "./styles.module.scss";

interface Award {
  Title: string;
  Description: string;
  Icon?: string;
  Logo?: {
    data?: {
      attributes?: {
        url: string;
        alternativeText: string;
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
  Awards = [] 
}) => {
  // const [index, setIndex] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setIndex((prev) => (prev + 1) % Awards.length);
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, [Awards.length]);

  const IconComp = (name: string, size = 18, color = "#fff") => {
    const LucideIcon = (LucideIcons as any)[name];
    return LucideIcon ? <LucideIcon size={size} color={color} strokeWidth={2.5} /> : null;
  };

  const BgIconComp = (name: string) => {
    const LucideIcon = (LucideIcons as any)[name];
    return LucideIcon ? (
      <LucideIcon
        size={120}
        color="#ff4fd8"
        strokeWidth={1}
        className={`${style.bgIcon}`}
      />
    ) : null;
  };

  const visibleCards = 3;
  const half = Math.floor(visibleCards / 2);

  return (
    <section className={style.awardsSection}>
      {/* Animated gradient background */}
      <div className={style.glowBg}></div>

      <div className="max-w-6xl mx-auto text-center relative z-10 px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={style.heading}
        >
          {Label}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={style.para}
        >
          {Heading}
        </motion.p>

        {/* Carousel-like floating awards */}
        <div className={style.cardContainer}>
          {Awards.map((award, i) => {
            // const diff = (i - index + Awards.length) % Awards.length;
            // const position = diff === 0 ? 0 : diff <= half ? diff : diff - Awards.length;

            // const x = position * 320;
            // const scale = position === 0 ? 1 : 0.8;
            // const opacity = position === 0 ? 1 : 0.4;
            // const zIndex = position === 0 ? 10 : 1;
            // const rotateY = position * 8;

            return (
              <motion.div
                key={i}
                className={style.card}
                initial={false}
                // animate={{ x, scale, opacity, rotateY }}
                // transition={{ duration: 0.8, ease: "easeInOut" }}
                // style={{ zIndex }}
              >
                <div className={style.tag}>
                  <div className={style.iconWrap}>
                    {award.Icon && IconComp(award.Icon)}
                  </div>
                  <span>{award.Title}</span>
                </div>

                <p className={style.desc}>{award.Description}</p>

                {award.Logo?.data?.attributes?.url && (
                  <div className="mt-6">
                    <Image
                      src={`${STRAPI_ASSETS}${award.Logo.data.attributes.url}`}
                      alt={award.Logo.data.attributes.alternativeText || award.Title}
                      width={100}
                      height={40}
                      className={style.logo}
                    />
                  </div>
                )}

                {award.Icon && <div className={style.bgIconWrap}>{BgIconComp(award.Icon)}</div>}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;
