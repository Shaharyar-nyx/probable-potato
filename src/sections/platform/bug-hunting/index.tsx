import Image from "next/image";
import React from "react";

import styles from "./styles.module.scss";
import { STRAPI_ASSETS } from "@/lib";

export const ContinuousBugHunting: React.FC<any> = ({ headline, content, title, cards }) => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className="tagline mb-10 text-primary-800">{headline}</div>
          <h2 className={`${styles.title} heading-2 mb-6`}>{title}</h2>
          <p className="paragraph-md">{content}</p>
        </div>

        <div className={styles.featuresGrid}>
          {cards.map(({ title, content, icon }: any, index: number) => (
            <div key={index} className={`${styles.featureCard} group`}>
              <div className={styles.featureHeader}>
                <Image
                  alt={icon.data.attributes.name}
                  className={styles.featureIcon}
                  height={105}
                  src={`${STRAPI_ASSETS}${icon.data.attributes.url}`}
                  width={105}
                />
                <h3
                  className={`heading-7 font-bold text-neutral-50 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100`}
                >
                  {title}
                </h3>
              </div>
              <div className="relative flex h-32 flex-col items-end justify-end">
                <p
                  className={`paragraph-md absolute left-0 right-0 text-neutral-50 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100`}
                >
                  {content}
                </p>
                <h3
                  className="heading-7 absolute left-0 right-0 font-bold text-neutral-50 transition-all duration-300 ease-in-out group-hover:translate-y-8 group-hover:opacity-0"
                  style={{ whiteSpace: "break-spaces" }}
                >
                  {title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
