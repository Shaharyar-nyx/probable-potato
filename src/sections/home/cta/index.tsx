"use client";

import Image from "next/image";
import React from "react";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";

import styles from "./styles.module.scss";
import { Button } from "@/components";
import { CTAProps } from "@/types";

export const CTA: React.FC<CTAProps> = ({ backgroundImage, description, title, tagline, cta }) => {
  return (
    <ParallaxProvider>
      <div className={styles.container}>
        <div className={styles.backgroundWrapper}>
          <Parallax className={styles.parallaxWrapper} translateY={[-20, 20]}>
            <img alt="image" className={styles.banner} src={backgroundImage.src} />
          </Parallax>
          <div className={styles.overlay} />
        </div>

        <div className={styles.content}>
          {/* Left Content */}
          <div className={styles.contentLeft}>
            {tagline !== undefined && <span className="tagline text-white">{tagline}</span>}
            <h2 className={`heading-2 font-bold`}>{title}</h2>
            <p className={styles.description}>{description}</p>
            {cta && <Button iconName={cta.icon}>{cta.label}</Button>}
          </div>
        </div>
      </div>
    </ParallaxProvider>
  );
};

export default CTA;
