"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { getStrapiAssetUrl } from "@/lib";
import styles from "./styles.module.scss";

interface HowWorksProps {
  heading?: string;
  text?: string;
  result_text?: string;
  image?: {
    data?: {
      attributes?: {
        url: string;
        alternativeText: string;
      };
    };
  };
  image_text?: string;
  [key: string]: any;
}

const HowItWorks: React.FC<HowWorksProps> = ({ heading = '', text = '', result_text = '', image , image_text }) => {
  const points = text.split("\n").filter((p) => p.trim() !== "");

  return (
    <section className={styles.cyberSection}>
      {/* Cyber Glow Grid Background */}
      <div className={styles.bgOverlay}></div>
      <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 relative z-10 items-center">
        
        {/* LEFT TEXT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.heading}>{heading}</h2>
          <ul className="mt-8 space-y-5">
            {points.map((point, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.3, duration: 0.6 }}
                viewport={{ once: true }}
                className={styles.point}
              >
                {point}
              </motion.li>
            ))}
          </ul>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 * points.length, duration: 0.8 }}
            viewport={{ once: true }}
            className={styles.resultText}
          >
        {result_text}
          </motion.p>
        </motion.div>

        {/* RIGHT IMAGE SIDE */}
      <motion.div
  initial={{ opacity: 0, x: 80 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 1 }}
  viewport={{ once: true }}
  className="relative flex flex-col items-center justify-center"
>
  <div className={styles.glowRing}></div>

  {image?.data?.attributes?.url && (
    <div className={styles.imageWrapper}>
       {/* 🟣 Image Caption */}
      {image_text && (
        <p className={styles.imageText}>{image_text}</p>
      )}
      <Image
        src={getStrapiAssetUrl(image.data.attributes.url)}
        alt={image.data.attributes.alternativeText || "Cyber Image"}
        width={500}
        height={500}
        className="relative z-10 rounded-2xl object-contain"
      />

     
    </div>
  )}
</motion.div>
</div>
    </section>
  );
};

export default HowItWorks;
