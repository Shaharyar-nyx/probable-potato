"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

import { Button, IconRenderer } from "@/components";
import data from "@/data/bug-hunters/referral.json";

import "./styles.scss";

const SwiperButtonNext: React.FC<{ disabled: boolean }> = ({ disabled }) => {
  const swiper = useSwiper();

  return (
    <Button
      className="border-none p-3"
      disabled={disabled}
      iconName="ArrowRightIcon"
      transparent
      variant="neutral"
      onClick={() => swiper.slideNext()}
    />
  );
};

const SwiperButtonPrev: React.FC<{ disabled: boolean }> = ({ disabled }) => {
  const swiper = useSwiper();

  return (
    <Button
      className="border-none p-3"
      disabled={disabled}
      iconName="ArrowLeftIcon"
      transparent
      variant="neutral"
      onClick={() => swiper.slidePrev()}
    />
  );
};

export const Referral: React.FC = () => {
  const [showReferralScreen, setShowReferralScreen] = useState(false);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleOpenReferral = () => {
    setShowReferralScreen(true);
  };

  const handleCloseReferral = () => {
    setShowReferralScreen(false);
  };

  // Handle body overflow when the referral screen is shown
  useEffect(() => {
    if (showReferralScreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = "visible";
    };
  }, [showReferralScreen]);

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
              <nav className="mt-[7rem] flex w-full justify-between bg-primary-500 px-16 py-5">
                <div className="flex items-center gap-3">
                  <Button className="p-3" iconName="ArrowLeftIcon" onClick={handleCloseReferral} />
                  <h2 className="heading-5 text-neutral-50">{data.referral_title}</h2>
                </div>
                <Button className="p-3" iconName="XMarkIcon" onClick={handleCloseReferral}>
                  Close
                </Button>
              </nav>
              <Swiper
                modules={[Navigation]}
                navigation={false}
                onSlideChange={(swiper) => {
                  // Update state when slide changes
                  setIsBeginning(swiper.isBeginning);
                  setIsEnd(swiper.isEnd);
                }}
                onSwiper={(swiper) => {
                  // Set initial state when Swiper is initialized
                  setIsBeginning(swiper.isBeginning);
                  setIsEnd(swiper.isEnd);
                }}
              >
                <SwiperSlide>Slide 1</SwiperSlide>
                <SwiperSlide>Slide 2</SwiperSlide>
                <div className="flex gap-5">
                  <SwiperButtonPrev disabled={isBeginning} />
                  <SwiperButtonNext disabled={isEnd} />
                </div>
              </Swiper>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
