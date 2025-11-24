"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { STRAPI_ASSETS } from "@/lib";
import styles from "./styles.module.scss";

interface TestimonialDark {
  quote: string;
  author_name: string;
  author_designation: string;
  author_avatar?: {
    data?: {
      attributes?: {
        url?: string;
        alternativeText?: string;
      };
    };
  };
}

interface TestimonialDarksSectionProps {
  title: string;
  subtitle: string;
  TestimonialsDark: TestimonialDark[];
  trusted_logos?: {
    data?: {
      attributes?: {
        url?: string;
        alternativeText?: string;
      };
    }[];
  };
  [key: string]: any;
}

export const TestimonialDarksSection: React.FC<TestimonialDarksSectionProps> = ({
  title,
  subtitle,
  TestimonialsDark,
  trusted_logos,
}) => {
  const [items, setItems] = useState<TestimonialDark[]>([]);

  useEffect(() => {
    if (Array.isArray(TestimonialsDark)) setItems(TestimonialsDark);
  }, [TestimonialsDark]);

  return (
    <section className={styles.TestimonialDarkSection}>
      {/* 🔮 Background Aurora Lights */}
      <div className={styles.bgAurora}>
        <div className={`${styles.orb} ${styles.orbPink}`}></div>
        <div className={`${styles.orb} ${styles.orbPurple}`}></div>
      </div>

      {/* Heading */}
      <motion.div
        className={styles.textCenter}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h2 className={styles.heading}>
          {title?.split(" ")[0]}{" "}
          <span className={styles.gradientText}>{title?.split(" ")[1]}</span>
        </h2>
        <p className={styles.subtitle}>{subtitle}</p>
      </motion.div>

      {/* Testimonials */}
      <div className={styles.TestimonialDarkGrid}>
        {items.length > 0 ? (
          items.map((t, index) => (
            <motion.div
              key={index}
              className={styles.card}
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 40px rgba(255, 0, 200, 0.3)",
              }}
            >
              <motion.p
                className={styles.quoteText}
                whileHover={{ color: "#fff", transition: { duration: 0.3 } }}
              >
                “{t.quote}”
              </motion.p>

              <div className={styles.authorInfo}>
                {t.author_avatar?.data?.attributes?.url && (
                  <motion.img
                    src={`${STRAPI_ASSETS}${t.author_avatar.data.attributes.url}`}
                    alt={
                      t.author_avatar.data.attributes.alternativeText ||
                      t.author_name
                    }
                    className={styles.avatar}
                    whileHover={{ rotate: 5 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  />
                )}
                <div>
                  <h4 className={styles.authorName}>{t.author_name}</h4>
                  <p className={styles.authorDesignation}>
                    {t.author_designation}
                  </p>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <p className={styles.noData}></p>
        )}
      </div>

      {/* Trusted Logos */}
      {trusted_logos?.data?.length ? (
        <motion.div
          className={styles.trustedBy}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className={styles.trustedTitle}>Trusted by leading brands</h3>

          <div className={styles.logoSliderWrapper}>
            <div className={styles.fadeLeft}></div>
            <div className={styles.fadeRight}></div>

            <div
              className={`${styles.logoGrid} ${
                trusted_logos.data.length > 5 ? styles.sliderActive : ""
              }`}
            >
              {trusted_logos.data.map((logo, i) => (
                <motion.img
                  key={i}
                  src={`${STRAPI_ASSETS}${logo.attributes?.url}`}
                  alt={logo.attributes?.alternativeText || "trusted logo"}
                  className={styles.trustedLogo}
                  whileHover={{ scale: 1.15, rotate: 2 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      ) : null}
    </section>
  );
};
