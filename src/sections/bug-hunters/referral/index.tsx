"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";

import { Button, IconRenderer } from "@/components";
import data from "@/data/bug-hunters/referral.json";

import "./styles.scss";

export const Referral: React.FC = () => {
  const [showReferralScreen, setShowReferralScreen] = useState(false);

  const handleOpenReferral = () => {
    setShowReferralScreen(true);
  };

  const handleCloseReferral = () => {
    setShowReferralScreen(false);
  };

  return (
    <section className="referral-parent-container">
      <div className="referral-container">
        <div className="referral-container-item">
          <span className="tagline mb-10 inline-block">{data.tagline}</span>
          <h2 className="heading-1 mb-5 font-bold text-primary-800">{data.title}</h2>
          <p className="paragraph-md mb-2 font-bold text-primary-800">{data.subtitle}</p>
          <p className="paragraph-md mb-5 text-primary-800">{data.text}</p>
          <Button onClick={handleOpenReferral}>Send a Referral</Button>
        </div>
        <div className="referral-container-item grid grid-cols-2 gap-6">
          {data.features.map((feature) => (
            <div key={feature.id} className="flex flex-col gap-3 p-10">
              <div className="flex gap-3">
                <div className="inline-block rounded-[4px] bg-primary-500 p-1">
                  <IconRenderer className="h-6 w-6 text-primary-50" iconName={feature.icon} />
                </div>
                <h3 className="heading-7 font-bold text-primary-800">{feature.title}</h3>
              </div>
              <p className="paragraph-md text-primary-800">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* AnimatePresence and Motion for Referral Screen */}
      <AnimatePresence>
        {showReferralScreen && (
          <motion.div
            animate={{ clipPath: "inset(0 0 0 0%)" }}
            className="referral-overlay"
            exit={{ clipPath: "inset(0 0 0 100%)" }}
            initial={{ clipPath: "inset(0 0 0 100%)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className="overlay-content">
              <h1 className="text-white">Hello World</h1>
              <Button onClick={handleCloseReferral}>Close</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
