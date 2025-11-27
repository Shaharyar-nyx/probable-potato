"use client";
import React from "react";
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
  Awards = [],
}) => {
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

  // Duplicate list for seamless infinite scroll
  const loopList = [...Awards, ...Awards];

  return (
    <section className={style.awardsSection}>
      <div className={style.glowBg}></div>

      <div className="max-w-6xl mx-auto text-center relative z-10 px-4">
        <h2 className={style.heading}>{Label}</h2>
        <p className={style.para}>{Heading}</p>

        {/* Auto-scrolling slider */}
        <div className={style.sliderWrapper}>
          <motion.div
            className={style.sliderTrack}
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 18,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {loopList.map((award, i) => (
              <div className={style.card} key={i}>
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
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;
