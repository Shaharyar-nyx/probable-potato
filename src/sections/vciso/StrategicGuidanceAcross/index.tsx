import React from "react";
import Image from "next/image";
import { MultiCardSection } from "@/types/components";
import { getStrapiAssetUrl } from "@/lib";
import styles from "./styles.module.scss";

export function StrategicGuidanceAcross(data: MultiCardSection) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <p className={styles.headline}>{data.headline}</p>
          <h2 className={styles.title}>{data.title}</h2>
        </div>

        {/* Cards Grid */}
        <div className={styles.cardsGrid}>
          {data.cards.map((card, index) => (
            <div key={index} className={styles.card}>
              {/* Icon Container */}
              <div className={styles.iconContainer}>
                {card.icon.data && (
                  <Image
                    src={getStrapiAssetUrl(card.icon.data.attributes.url)}
                    alt={card.icon.data.attributes.alternativeText || card.title}
                    width={40}
                    height={40}
                    className={styles.icon}
                  />
                )}
              </div>

              {/* Title */}
              <h4 className={styles.cardTitle}>
                {card.headline.split('\n').map((line, lineIndex) => (
                  <React.Fragment key={lineIndex}>
                    {line}
                    {lineIndex < card.headline.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </h4>

              {/* Description */}
              <p className={styles.cardDescription}>{card.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
