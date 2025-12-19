"use client";

import Image from "next/image";
import React from "react";

import styles from "./styles.module.scss";
import { getStrapiAssetUrl } from "@/lib";
import { useIsMobile } from "@/hooks";

const MissionsCard = ({ card }: { card: any }) => (
  <div className={styles.missionsCard}>
    <Image
      alt={card.image?.data?.attributes?.name}
      className={styles.missionImage}
      height={400}
      src={getStrapiAssetUrl(card.image?.data?.attributes?.url)}
      width={600}
    />
  </div>
);

const FeatureCard = ({ card, isMobile }: { card: any; isMobile: boolean }) => (
  <div className={styles.featureCard}>
    <div className={styles.featureHeader}>
      <Image
        alt={card.icon?.data?.attributes?.name}
        className={styles.featureIcon}
        height={isMobile ? 40 : 60}
        src={getStrapiAssetUrl(card.icon?.data?.attributes?.url)}
        width={isMobile ? 40 : 60}
      />
      <h3 className={`${isMobile ? 'heading-8' : 'heading-7'} font-bold`}>{card.title}</h3>
    </div>
    <p className="paragraph-md mt-4 lg:mt-0">{card.content}</p>
  </div>
);

const ProgramCard = ({ card }: { card: any }) => (
  <div className={styles.programCard}>
    <div className={styles.programCardContent}>
      <div className="paragraph-sm">{card.title}</div>
      <div className="paragraph-xxl font-semibold">{card.content}</div>
    </div>
    <Image
      alt={card.image?.data?.attributes?.name}
      className={styles.programImage}
      height={400}
      src={getStrapiAssetUrl(card.image?.data?.attributes?.url)}
      width={600}
    />
  </div>
);

export const BugBountyGrid: React.FC<any> = ({ headline, title, content, cards }) => {
  const isMobile = useIsMobile();
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={`${styles.gridContent} grid`}>
          <div className={styles.content}>
            <div className={`${isMobile ? 'paragraph-md' : 'tagline'} mb-6 lg:mb-10`}>{headline}</div>
            <h2 className={`${isMobile ? 'heading-7' : 'heading-2'} mb-4 lg:mb-6 font-bold`}>{title}</h2>
            <p className="paragraph-md">{content}</p>
          </div>
          <div className="relative">
            <div className={styles.cardContainer}>
              <div className={styles.cardColumn}>
                {cards && cards[1] && isMobile && <FeatureCard card={cards[1]} isMobile={isMobile} />}
                {cards && cards[0] && <ProgramCard card={cards[0]} />}
                {cards && cards[1] && !isMobile && <FeatureCard card={cards[1]} isMobile={isMobile} />}
              </div>
              <div className={styles.cardColumn}>
                {cards && cards[2] && <FeatureCard card={cards[2]} isMobile={isMobile} />}
                {cards && cards[3] && <MissionsCard card={cards[3]} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
