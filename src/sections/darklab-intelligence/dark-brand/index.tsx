"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { STRAPI_ASSETS } from "@/lib/constants";
import styles from "./styles.module.scss";

interface DarkTab {
  title: string;
  headline: string;
  content: string;
  image?: {
    data?: {
      attributes?: {
        url: string;
        alternativeText: string;
      };
    };
  };
}

interface DarkBrandProps {
  heading?: string;
  darktab?: DarkTab[];
  [key: string]: any;
}

const DarkBrand: React.FC<DarkBrandProps> = ({ heading = '', darktab = [] }) => {
  return (
    <section className={styles.darkBrandSection}>
      <div className={styles.overlay}></div>

      {/* Heading */}
      <motion.h2
        className={styles.mainHeading}
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {heading}
      </motion.h2>

      {/* Tabs */}
      <div className={styles.tabsWrapper}>
        {darktab.map((tab, i) => (
          <motion.div
            key={i}
            className={styles.tabItem}
            initial={{ opacity: 0, x: i % 2 === 0 ? -80 : 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <div className={styles.iconBox}>
              {tab.image?.data?.attributes?.url && (
                <Image
                  src={`${STRAPI_ASSETS}${tab.image.data.attributes.url}`}
                  alt={tab.image.data.attributes.alternativeText || tab.title}
                  width={50}
                  height={50}
                  className={styles.icon}
                />
              )}
            </div>

            <div className={styles.textBox}>
              <h3>{tab.title}</h3>
              <h4>{tab.headline}</h4>
              <p>{tab.content}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default DarkBrand;
