import Image from "next/image";
import React from "react";

import styles from "./styles.module.scss";
import { STRAPI_ASSETS } from "@/lib";

export const BugBountyGrid: React.FC<any> = ({ headline, title, content, cards }) => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={`${styles.gridContent} grid`}>
          <div className={styles.content}>
            <div className="tagline mb-10">{headline}</div>
            <h2 className="heading-2 mb-6 font-bold">{title}</h2>
            <p className="paragraph-md">{content}</p>
          </div>
          <div className="relative">
            <div className={styles.cardContainer}>
              <div className={styles.cardColumn}>
                {cards && cards[0] && (
                  <div className={styles.programCard}>
                    <div className={styles.programCardContent}>
                      <div className="paragraph-sm">{cards[0].title}</div>
                      <div className="paragraph-xxl font-semibold">{cards[0].content}</div>
                    </div>
                    <Image
                      alt={cards[0].image?.data?.attributes?.name}
                      className={styles.programImage}
                      height={400}
                      src={`${STRAPI_ASSETS}${cards[0].image?.data?.attributes?.url}`}
                      width={600}
                    />
                  </div>
                )}
                {cards && cards[1] && (
                  <div className={styles.featureCard}>
                    <div className={styles.featureHeader}>
                      <Image
                        alt={cards[1].icon?.data?.attributes?.alternativeText}
                        className={styles.featureIcon}
                        height={60}
                        src={`${STRAPI_ASSETS}${cards[1].icon?.data?.attributes?.url}`}
                        width={60}
                      />
                      <h3 className="heading-7 font-bold">{cards[1].title}</h3>
                    </div>
                    <p className="paragraph-md">{cards[1].content}</p>
                  </div>
                )}
              </div>
              <div className={styles.cardColumn}>
                {cards && cards[2] && (
                  <div className={styles.featureCard}>
                    <div className={styles.featureHeader}>
                      <Image
                        alt={cards[2].icon?.data?.attributes?.alternativeText}
                        className={styles.featureIcon}
                        height={60}
                        src={`${STRAPI_ASSETS}${cards[2].icon?.data?.attributes?.url}`}
                        width={60}
                      />
                      <h3 className="heading-7 font-bold">{cards[2].title}</h3>
                    </div>
                    <p className="paragraph-md">{cards[2].content}</p>
                  </div>
                )}

                {cards && cards[3] && (
                  <div className={styles.missionsCard}>
                    <Image
                      alt={cards[3].image?.data?.attributes?.alternativeText}
                      className={styles.missionImage}
                      height={400}
                      src={`${STRAPI_ASSETS}${cards[3].image?.data?.attributes?.url}`}
                      width={600}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
