"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

import "./styles.scss";
import data from "@/data/bug-hunters/ecosystem.json";

interface EcosystemItemProps {
  description: string;
  icon: string;
  title: string;
}

const EcosystemFeatureItem: React.FC<EcosystemItemProps> = ({ title, icon, description }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="ecosystem-feature-item"
      initial={{ backgroundColor: "#F6F7F8" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      whileHover={{ backgroundColor: "#045DE3" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.img
        alt={title}
        animate={
          isHovered
            ? { width: "46px", height: "46px" }
            : {
                width: "104px",
                height: "104px",
              }
        }
        className="ecosystem-feature-icon"
        initial={{ width: "104px", height: "104px" }}
        src={icon}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
      <motion.h3
        animate={
          isHovered
            ? {
                left: "92px",
                top: "36px",
                width: "calc(100% - 110px)",
                color: "#F6F7F8",
              }
            : {
                left: "40px",
                top: "calc(100% - 60px)",
                width: "100%",
                color: "#02255B",
              }
        }
        className="heading-7 ecosystem-feature-title"
        initial={{
          left: "40px",
          top: "calc(100% - 60px)",
          width: "100%",
          color: "#02255B",
        }}
        style={{
          position: "absolute",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {title}
      </motion.h3>
      <AnimatePresence>
        {isHovered && (
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="paragraph-md ecosystem-feature-description"
            exit={{ opacity: 0, y: 20 }}
            initial={{ opacity: 0, y: 20 }}
            style={{ display: isHovered ? "block" : "none" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {description}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const Ecosystem: React.FC = () => {
  return (
    <section className="ecosystem-parent-container">
      <div className="ecosystem-container">
        <h2 className="heading-1 ecosystem-title">{data.title}</h2>
        <p className="paragraph-md ecosystem-description">{data.description}</p>
        <div className="ecosystem-feature-container">
          {data.features.map((feature) => (
            <EcosystemFeatureItem key={feature.id} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};
