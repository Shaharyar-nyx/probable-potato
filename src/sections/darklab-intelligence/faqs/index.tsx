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
  [key: string]: any;
}

const FaqSection: React.FC<FaqSectionProps> = ({
  heading = '',
  description = '',
  faqs = [],
  background,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const toggleFAQ = (index: number) =>
    setActiveIndex(activeIndex === index ? null : index);

  return (
    <section className={styles.faqSection}>
      {/* Background */}
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
        {/* Left Side */}
        <motion.div
          className={styles.left}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className={styles.smallLabel}>FAQ</span>
          <h2>{heading}</h2>
          <p>{description}</p>
          
          
        </motion.div>

        {/* Right Side Accordion */}
        <motion.div
          className={styles.right}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`${styles.faqItem} ${
                activeIndex === i ? styles.active : ""
              }`}
            >
              <button className={styles.question} onClick={() => toggleFAQ(i)}>
                <span className={styles.questionNumber}>{i + 1}.</span>
                <span className={styles.questionText}>{faq.question}</span>
                <motion.span
                  className={styles.arrow}
                  animate={{ rotate: activeIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  ▼
                </motion.span>
              </button>

              <AnimatePresence>
                {activeIndex === i && (
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
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FaqSection;