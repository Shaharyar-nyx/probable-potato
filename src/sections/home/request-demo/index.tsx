"use client";

import Image from "next/image";
import React from "react";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";

import styles from "./styles.module.scss";
import { requestDemoContent } from "@/data/requestDemo";

interface RequestDemoProps {
  content?: typeof requestDemoContent;
}

export const RequestDemo: React.FC = ({ content = requestDemoContent }: RequestDemoProps) => {
  return (
    <ParallaxProvider>
      <div className={styles.container}>
        <div className={styles.backgroundWrapper}>
          <Parallax className={styles.parallaxWrapper} translateY={[-20, 20]}>
            <img alt={content.banner.alt} className={styles.banner} src={content.banner.src} />
          </Parallax>
          <div className={styles.overlay} />
        </div>

        <div className={styles.content}>
          {/* Left Content */}
          <div className={styles.contentLeft}>
            <h2 className={`${styles.title} heading-2 font-bold`}>{content.title}</h2>
            <p className={styles.subtitle}>{content.subtitle}</p>
            <div className={styles.buttonGroup}>
              <button className={styles.primaryButton}>
                {content.buttonText}{" "}
                <span>
                  <Image
                    alt={content.arrowIcon.alt}
                    height={content.arrowIcon.height}
                    src={content.arrowIcon.src}
                    width={content.arrowIcon.width}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </ParallaxProvider>
  );
};

export default RequestDemo;
