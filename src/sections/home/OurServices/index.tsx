"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { STRAPI_ASSETS } from "@/lib";
import styles from "./styles.module.scss";

interface SubService {
  heading: string;
  description: string;
  icon?: {
    data?: {
      attributes?: {
        url?: string;
      };
    };
  };
  cta_url?: string;
}

interface OurServicesProps {
  heading: string;
  subheading?: string;
  description: string;
  subServices: SubService[];
  [key: string]: any; // Allow additional props from BlockType
}

export const OurServices: React.FC<OurServicesProps> = ({
  heading,
  subheading,
  description,
  subServices,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % subServices.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [subServices.length]);

  return (
    <section className={styles.solutionSection}>
      {/* === Title Section === */}
      <div className={styles.topText}>
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={styles.tag}
        >
          The Solution
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {heading} {subheading && <><br /> {subheading}</>}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {description}
        </motion.p>
      </div>

      {/* === Content Section === */}
      <div className={styles.contentArea}>
        {/* Left Side Menu */}
        <div className={styles.leftPanel}>
          {subServices.map((item, index) => (
            <motion.div
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`${styles.sideItem} ${
                activeIndex === index ? styles.active : ""
              }`}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <span>{item.heading}</span>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.p
                    className={styles.subDesc}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4 }}
                  >
                    {item.description}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Right Image + CTA */}
        <motion.div
          key={activeIndex}
          className={styles.imageWrapper}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          onClick={() =>
            window.open(subServices[activeIndex]?.cta_url, "_blank")
          }
        >
          <motion.img
            src={`${STRAPI_ASSETS}${subServices[activeIndex]?.icon?.data?.attributes?.url}`}
            alt={subServices[activeIndex]?.heading}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          />
          <div className={styles.overlay}>
            <span>Explore →</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
