"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";

import styles from "./styles.module.scss";
import { BugBountyProgramsProps } from "@/types";

const slideVariants = {
  enter: {
    y: 50,
    opacity: 0,
  },
  center: {
    y: 0,
    opacity: 1,
  },
  exit: {
    y: -50,
    opacity: 0,
  },
};

export const BugBountyPrograms: React.FC<BugBountyProgramsProps> = ({ title, subtitle, description, slides }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <section className={styles.section}>
      <motion.div
        animate={{ y: 0, opacity: 1 }}
        className="mb-6 text-center text-primary-800"
        initial={{ y: 50, opacity: 0 }}
        transition={{ duration: 0.1 }}
      >
        <h1 className="heading-1 mb-5 font-bold">{title}</h1>
        <p className="paragraph-xl mb-2 font-semibold">{subtitle}</p>
        <p className="paragraph-lg">{description}</p>
      </motion.div>
      <div className={styles.navigation}>
        {slides.map((slide, index) => (
          <button
            key={index}
            className={`paragraph-sm ${styles.navButton} ${index === activeSlide ? styles.active : ""}`}
            onClick={() => setActiveSlide(index)}
          >
            {slide.title}
          </button>
        ))}
      </div>

      <div className={styles.content}>
        <AnimatePresence mode="wait">
          {slides.map(
            (slide, index) =>
              index === activeSlide && (
                <motion.div
                  key={index}
                  animate="center"
                  className={styles.slide}
                  exit="exit"
                  initial="enter"
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                  variants={slideVariants}
                >
                  <div className={`${styles.slideContent} ${index % 2 !== 0 ? styles.reverse : ""}`}>
                    <motion.div
                      animate={{ y: 0, opacity: 1 }}
                      className={styles.textContent}
                      initial={{ y: 50, opacity: 0 }}
                      transition={{ duration: 0.1 }}
                    >
                      <h1 className="heading-1 mb-5 font-bold text-primary-500">{slide.title}</h1>
                      <p className="paragraph-xl !mb-3 !mt-0 font-semibold text-primary-800">{slide.subtitle}</p>
                      <p className="paragraph-md !mt-0 text-primary-800">{slide.description}</p>
                    </motion.div>
                    <motion.div
                      animate={{ y: 0, opacity: 1 }}
                      className={styles.imageContent}
                      initial={{ y: 50, opacity: 0 }}
                      transition={{ duration: 0.1 }}
                    >
                      <Image alt={slide.title} className={styles.image} height={400} src={slide.images} width={500} />
                    </motion.div>
                  </div>
                </motion.div>
              ),
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
