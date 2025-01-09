"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

import "./styles.scss";
import data from "@/data/bug-hunters/ecosystem.json";
import { useScreenWidth } from "@/hooks";

interface EcosystemItemProps {
  description: string;
  icon_dark: string;
  icon_light: string;
  title: string;
}

const XL_BOX_PADDING = 40;
const LG_BOX_PADDING = 20;
const XL_ICON_SIZE_BIG = 104;
const XL_ICON_SIZE_SMALL = 46;
const LG_ICON_SIZE_BIG = 82;
const LG_ICON_SIZE_SMALL = 38;

const EcosystemFeatureItem: React.FC<EcosystemItemProps> = ({ title, icon_light, icon_dark, description }) => {
  const [isHovered, setIsHovered] = useState(false);
  const screenWidth = useScreenWidth();

  // Determine icon sizes and padding based on screen width
  const BOX_PADDING = screenWidth > 1280 ? XL_BOX_PADDING : LG_BOX_PADDING;
  const ICON_SIZE_BIG = screenWidth > 1280 ? XL_ICON_SIZE_BIG : LG_ICON_SIZE_BIG;
  const ICON_SIZE_SMALL = screenWidth > 1280 ? XL_ICON_SIZE_SMALL : LG_ICON_SIZE_SMALL;

  return (
    <motion.div
      className="ecosystem-feature-item"
      initial={{ backgroundColor: "#F6F7F8" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      whileHover={{ backgroundColor: "#045DE3" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Dark Icon */}
      <div className="relative">
        <motion.img
          alt={`${title} Dark Icon`}
          animate={
            isHovered
              ? { width: ICON_SIZE_SMALL, height: ICON_SIZE_SMALL, opacity: 0 }
              : { width: ICON_SIZE_BIG, height: ICON_SIZE_BIG, opacity: 1 }
          }
          className="ecosystem-feature-icon"
          initial={{ width: ICON_SIZE_BIG, height: ICON_SIZE_BIG, opacity: 1 }}
          src={icon_dark}
          style={{ position: "absolute", top: 0, left: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />

        {/* Light Icon */}
        <motion.img
          alt={`${title} Light Icon`}
          animate={
            isHovered
              ? { width: ICON_SIZE_SMALL, height: ICON_SIZE_SMALL, opacity: 1 }
              : { width: ICON_SIZE_BIG, height: ICON_SIZE_BIG, opacity: 0 }
          }
          className="ecosystem-feature-icon"
          initial={{ width: ICON_SIZE_BIG, height: ICON_SIZE_BIG, opacity: 0 }}
          src={icon_light}
          style={{ position: "absolute", top: 0, left: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      </div>

      <motion.h3
        animate={
          isHovered
            ? {
                left: BOX_PADDING + 52, // Adding 52px for icon offset
                top: BOX_PADDING - 4,
                width: "calc(100% - 110px)",
                color: "#F6F7F8",
              }
            : {
                left: BOX_PADDING,
                top: "calc(100% - 60px)",
                width: "80%",
                color: "#02255B",
              }
        }
        className="ecosystem-feature-title"
        initial={{
          left: BOX_PADDING,
          top: "calc(100% - 60px)",
          width: "80%",
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
            className="ecosystem-feature-description"
            exit={{ opacity: 0, y: 20 }}
            initial={{ opacity: 0, y: 20 }}
            style={{
              display: isHovered ? "block" : "none",
              position: "absolute",
              bottom: "40px",
              left: BOX_PADDING,
            }}
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
