import React from "react";
import Image from "next/image";
import { MultiCardSection } from "@/types/components";
import { STRAPI_ASSETS } from "@/lib";
import styles from "./styles.module.scss";

export function ClearOutputs(data: MultiCardSection) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <p className={styles.headline}>
            {data.headline}
          </p>
          <h2 className={styles.title}>
            {data.title}
          </h2>
          <p className={styles.description}>
            {data.content}
          </p>
        </div>

        {/* Cards Grid */}
        <div className={styles.cardsGrid}>
          {data.cards.map((card, index) => (
            <div key={index} className={styles.card}>
              {/* Card Header with Icon and Title */}
              <div className={styles.cardHeader}>
                <div className={styles.iconContainer}>
                  {card.icon.data && (
                    <Image
                      src={`${STRAPI_ASSETS}${card.icon.data.attributes.url}`}
                      alt={card.icon.data.attributes.alternativeText || card.title}
                      width={20}
                      height={20}
                      className={styles.icon}
                    />
                  )}
                </div>
                <h4 className={styles.cardTitle}>
                  {card.title}
                </h4>
              </div>

              {/* Card Description */}
              <p className={styles.cardDescription}>
                {card.headline}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
