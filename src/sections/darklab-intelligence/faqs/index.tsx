"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { STRAPI_ASSETS } from "@/lib/constants";
import styles from "./styles.module.scss";

interface FAQItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  heading?: string;
  description?: string;
  faqs?: FAQItem[];
  background?: {
    data?: {
      attributes?: { url: string };
    };
  };
}

const FaqSection: React.FC<FaqSectionProps> = ({
  heading = "",
  description = "",
  faqs = [],
  background,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const toggleFAQ = (index: number) =>
    setActiveIndex(activeIndex === index ? null : index);

  return (
    <section className={styles.faqSection}>
      {background?.data?.attributes?.url && (
        <Image
          src={`${STRAPI_ASSETS}${background.data.attributes.url}`}
          alt="Background"
          fill
          className={styles.bgImage}
        />
      )}

      <div className={styles.overlay}></div>

      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className={styles.tag}>FAQ</span>
          <h2>{heading}</h2>
          <p>{description}</p>
        </motion.div>

        <div className={styles.faqList}>
          {faqs.map((faq, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={index}
                className={`${styles.faqItem} ${isActive ? styles.active : ""}`}
              >
                <button
                  className={styles.question}
                  onClick={() => toggleFAQ(index)}
                >
                  <span className={styles.text}>{faq.question}</span>

                  <motion.span
                    className={styles.icon}
                    animate={{ rotate: isActive ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {isActive ? "−" : "+"}
                  </motion.span>
                </button>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      className={styles.answer}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p>{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
