"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { getStrapiAssetUrl } from "@/lib";
import styles from "./styles.module.scss";

/*  
  IMPORTANT FIX:
  Remove strict typing on the component so TS does not
  force this component to match BlockType from the page builder.
*/

export const OurServices = ({
  heading = "",
  subheading = "",
  description = "",
  subServices = [],
}: any) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = subServices[activeIndex];

  return (
    <section className={styles.solutionSection}>
      {/* === Title Section === */}
      <div className={styles.topText}>
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {heading} <br /> {subheading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {description}
        </motion.p>
      </div>

      {/* === Desktop / Tablet Layout === */}
      <div className={styles.contentArea}>
        {/* Left Panel List */}
        <div className={styles.leftPanel}>
          {subServices?.map((item: any, index: number) => (
            <motion.button
              type="button"
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`${styles.sideItem} ${
                activeIndex === index ? styles.active : ""
              }`}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <div className={styles.sideItemHeader}>
                {item?.icon?.data?.attributes?.url && (
                  <div className={styles.sideIcon}>
                    <img
                      src={getStrapiAssetUrl(item.icon.data.attributes.url)}
                      alt={item.heading}
                    />
                  </div>
                )}
                <span>{item.heading}</span>
              </div>
              <p className={styles.subDesc}>{item.description}</p>
            </motion.button>
          ))}
        </div>

        {/* Right Image (Desktop) */}
        {activeItem && (
          <motion.div
            key={activeIndex}
            className={styles.imageWrapper}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onClick={() =>
              activeItem.cta_url && window.open(activeItem.cta_url, "_blank")
            }
          >
            {activeItem?.icon?.data?.attributes?.url && (
              <motion.img
                src={getStrapiAssetUrl(activeItem.icon.data.attributes.url)}
                alt={activeItem.heading}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />
            )}

            <div className={styles.overlay}>
              <span>Explore →</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* === Mobile Cards === */}
      <div className={styles.mobileCards}>
        {subServices?.map((item: any, index: number) => (
          <motion.div
            key={`mobile-${index}`}
            className={styles.mobileCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            onClick={() => item.cta_url && window.open(item.cta_url, "_blank")}
          >
            {item?.icon?.data?.attributes?.url && (
              <div className={styles.mobileImageWrapper}>
                <img
                  src={getStrapiAssetUrl(item.icon.data.attributes.url)}
                  alt={item.heading}
                />
              </div>
            )}

            <div className={styles.mobileCardBody}>
              <h3>{item.heading}</h3>
              <p>{item.description}</p>
              {item.cta_url && (
                <span className={styles.mobileCta}>Explore →</span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default OurServices;