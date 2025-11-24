"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./styles.module.scss";
import { STRAPI_ASSETS } from "@/lib";
import { ArrowRight } from "lucide-react";

interface Study {
  title?: string;
  category: string;
  description: string;
  metric_value: string;
  metric_label: string;
  cta_text?: string;
  cta_url?: string;
  image?: {
    data?: {
      attributes?: {
        url?: string;
        alternativeText?: string;
      };
    };
  };
}

interface CaseStudiesProps {
  title: string;
  description?: string;
  caseStudies?: Study[];
  study?: Study[];
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({
  title,
  description,
  caseStudies,
  study,
}) => {
  const [studies, setStudies] = useState<Study[]>([]);

  useEffect(() => {
    if (caseStudies?.length) setStudies(caseStudies);
    else if (study?.length) setStudies(study);
  }, [caseStudies, study]);

  return (
    <motion.section
      className={styles.caseStudiesSection}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* HEADING */}
      <motion.h2
        className={styles.heading}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {title.split(" ")[0]}{" "}
        <span className={styles.gradientText}>
          {title.split(" ")[1] || ""}
        </span>
      </motion.h2>

      {description && (
        <motion.p
          className={styles.description}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {description}
        </motion.p>
      )}

      {/* CASE STUDY GRID */}
      <motion.div
        className={styles.caseGrid}
        initial="hidden"
        whileInView="show"
        variants={{
          hidden: {},
          show: {
            transition: { staggerChildren: 0.2 },
          },
        }}
        viewport={{ once: true }}
      >
        {studies.map((item, index) => (
          <motion.div
            key={index}
            className={styles.card}
            variants={{
              hidden: { opacity: 0, y: 40 },
              show: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.5 }}
          >
            {item.image?.data?.attributes?.url && (
              <motion.div
                className={styles.cardImage}
                style={{
                  backgroundImage: `url(${STRAPI_ASSETS}${item.image.data.attributes.url})`,
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
            )}

            <div className={styles.cardContent}>
              <span className={styles.tag}>{item.category}</span>
              <h3 className={styles.cardTitle}>{item.title || "Untitled"}</h3>
              <p className={styles.cardDesc}>{item.description}</p>

              <div className={styles.metrics}>
                <motion.span
                  className={styles.metricValue}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {item.metric_value}
                </motion.span>
                <span className={styles.metricLabel}>{item.metric_label}</span>
                {item.cta_url && (
                  <motion.a
                    href={
                      item.cta_url.startsWith("http")
                        ? item.cta_url
                        : `https://${item.cta_url}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.ctaLink}
                    whileHover={{ x: 4 }}
                  >
                    {item.cta_text || "Read Case Study"}{" "}
                    <ArrowRight className="inline w-4 h-4 ml-1" />
                  </motion.a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* BUTTON */}
      <motion.div
        className={styles.buttonContainer}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <button className={styles.viewAllBtn}>View All</button>
      </motion.div>
    </motion.section>
  );
};
