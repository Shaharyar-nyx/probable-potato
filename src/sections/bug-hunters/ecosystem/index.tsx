"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

import 'swiper/css';
import 'swiper/css/pagination';
import "./styles.scss";
import { useIsMobile, useScreenWidth } from "@/hooks";
import { getStrapiAssetUrl } from "@/lib";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";

interface EcosystemItemProps {
  content: string;
  icon: any;
  title: string;
}

const XL_BOX_PADDING = 40;
const LG_BOX_PADDING = 24;
const BOX_PADDING = 16;
const XL_ICON_SIZE_BIG = 104;
const XL_ICON_SIZE_SMALL = 46;
const LG_ICON_SIZE_BIG = 82;
const LG_ICON_SIZE_SMALL = 38;

const EcosystemFeatureItem: React.FC<EcosystemItemProps> = ({ title, icon, content }) => {
  const [isHovered, setIsHovered] = useState(false);
  const screenWidth = useScreenWidth();

  // Determine if cards should always be in "hovered" state for smaller screens
  const alwaysHovered = screenWidth < 1024;

  // Determine padding and icon sizes based on screen width
  const currentBoxPadding = screenWidth > 1280 ? XL_BOX_PADDING : screenWidth > 1024 ? LG_BOX_PADDING : BOX_PADDING;
  const ICON_SIZE_BIG = screenWidth > 1280 ? XL_ICON_SIZE_BIG : LG_ICON_SIZE_BIG;
  const ICON_SIZE_SMALL = screenWidth > 1280 ? XL_ICON_SIZE_SMALL : LG_ICON_SIZE_SMALL;

  // Determine left shift based on screen width
  const leftShift = screenWidth > 1280 ? 52 : screenWidth > 1024 ? 46 : 48;

  return (
    <motion.div
      animate={alwaysHovered ? { backgroundColor: "#045DE3" } : {}}
      className="ecosystem-feature-item"
      initial={{ backgroundColor: "#F6F7F8" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      whileHover={!alwaysHovered ? { backgroundColor: "#045DE3" } : undefined}
      onMouseEnter={() => !alwaysHovered && setIsHovered(true)}
      onMouseLeave={() => !alwaysHovered && setIsHovered(false)}
    >
      {/* Dark Icon */}
      <div className="relative">
        <motion.img
          alt={icon.data.attributes.name}
          animate={
            alwaysHovered || isHovered
              ? { width: ICON_SIZE_SMALL, height: ICON_SIZE_SMALL, opacity: 0 }
              : { width: ICON_SIZE_BIG, height: ICON_SIZE_BIG, opacity: 1 }
          }
          className="ecosystem-feature-icon"
          initial={{ width: ICON_SIZE_BIG, height: ICON_SIZE_BIG, opacity: 1 }}
          src={getStrapiAssetUrl(icon.data.attributes.url)}
          style={{ position: "absolute", top: 0, left: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />

        {/* Light Icon */}
        <motion.img
          alt={icon.data.attributes.name}
          animate={
            alwaysHovered || isHovered
              ? { width: ICON_SIZE_SMALL, height: ICON_SIZE_SMALL, opacity: 1 }
              : { width: ICON_SIZE_BIG, height: ICON_SIZE_BIG, opacity: 0 }
          }
          className="ecosystem-feature-icon"
          initial={{ width: ICON_SIZE_BIG, height: ICON_SIZE_BIG, opacity: 0 }}
          src={getStrapiAssetUrl(icon.data.attributes.url)}
          style={{ position: "absolute", top: 0, left: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      </div>

      <motion.h3
        animate={
          alwaysHovered || isHovered
            ? {
              left: currentBoxPadding + leftShift,
              top: currentBoxPadding,
              width: "calc(100% - 110px)",
              color: "#F6F7F8",
            }
            : {
              left: currentBoxPadding,
              top: "calc(100% - 60px)",
              width: "80%",
              color: "#02255B",
            }
        }
        className="ecosystem-feature-title"
        initial={{
          left: currentBoxPadding,
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
        {(alwaysHovered || isHovered) && (
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="ecosystem-feature-description"
            exit={{ opacity: 0, y: 20 }}
            initial={{ opacity: 0, y: 20 }}
            style={{
              display: "block",
              position: "absolute",
              bottom: currentBoxPadding,
              left: currentBoxPadding,
              maxWidth: `calc(100% - ${2 * currentBoxPadding}px)`, // Ensures width respects padding
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {content}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const Ecosystem: React.FC<any> = ({ title, content, cards }) => {
  const isMobile = useIsMobile();
  return (
    <section className="ecosystem-parent-container">
      <div className="ecosystem-container">
        <h2 className={`${isMobile ? "heading-7" : "heading-1"} ecosystem-title`}>{title}</h2>
        <p className="paragraph-md ecosystem-description">{content}</p>
        {!isMobile && (
          <div className="ecosystem-feature-container">
            {cards.map((attributes: any, index: number) => (
              <EcosystemFeatureItem key={index} {...attributes} />
            ))}
          </div>
        )}
      </div>

      {isMobile && <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={28}
        slidesPerView={1}
        centeredSlides
        loop
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className="swiper-container"
      >
        {cards.map(({ content, icon, title }: any, index: number) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col gap-[18px] justify-start p-7 bg-primary-500 rounded-xl h-auto">
              <div className="flex flex-row items-center gap-3">
                <Image
                  src={getStrapiAssetUrl(icon.data.attributes.url)}
                  alt={icon.data.attributes.name}
                  width={48}
                  height={48}
                  className="brightness-0 invert"
                />
                <h3 className="heading-8 font-bold text-neutral-50">{title}</h3>
              </div>
              <p className="paragraph-md text-neutral-50">{content}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>}
    </section>
  );
};
