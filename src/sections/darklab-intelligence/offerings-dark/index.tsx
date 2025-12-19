"use client";

import React from "react";
import { getStrapiAssetUrl } from "@/lib";
import styles from "./styles.module.scss";

interface IconType {
  data?: {
    attributes?: {
      url?: string;
      alternativeText?: string;
      name?: string;
      mime?: string;
    };
  };
}

interface OfferingCardItem {
  heading?: string;
  description?: string;
  icon?: IconType;
}

interface OfferingsDarkProps {
  title?: string;
  description?: string;
  OfferingCard?: OfferingCardItem[];
  [key: string]: any; // Allow additional props from BlockType
}

export const OfferingsDark: React.FC<OfferingsDarkProps> = ({
  title,
  description,
  OfferingCard,
}) => {
  return (
    <section className={styles.offeringsSection}>
      <div className={styles.container}>
        {/* === Section Header === */}
        <div className={styles.header}>
          {title && <h2 className={styles.title}>{title}</h2>}
          {description && <p className={styles.subtitle}>{description}</p>}
        </div>

        {/* === Offerings Cards === */}
        <div className={styles.cardsGrid}>
          {OfferingCard?.map((item, i) => (
           <div className={styles.card} key={i}>
  <div className={styles.cardHeader}>
    {item.icon?.data?.attributes?.url && (
      <div className={styles.iconWrapper}>
        <div className={styles.iconBackground}>
          <img
            src={getStrapiAssetUrl(item.icon.data.attributes.url)}
            alt={item.icon.data.attributes.alternativeText || item.heading || "icon"}
            className={styles.icon}
          />
        </div>
      </div>
    )}
    {item.heading && <h3 className={styles.cardTitle}>{item.heading}</h3>}
  </div>

  {item.description && <p className={styles.cardText}>{item.description}</p>}
</div>

          ))}
        </div>
      </div>
    </section>
  );
};

export default OfferingsDark;
