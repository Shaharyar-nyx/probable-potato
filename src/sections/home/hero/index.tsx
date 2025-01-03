"use client";

import Image from "next/image";
import React from "react";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";

import styles from "./styles.module.scss";
import { Button } from "@/components";
import { heroContent } from "@/data/hero";

export const Hero: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.backgroundWrapper}>
        <Image alt="background animation" fill priority src={heroContent.backgroundVideo} />
      </div>
      <div className={styles.overlay} />
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <div className={`${styles.title} display-1 font-bold`}>{heroContent.title}</div>
            <p className={`${styles.description} paragraph-lg`}>{heroContent.description}</p>
            <Button icon={<Image alt="arrow up right" height={24} src="/images/arrow-up-right.svg" width={24} />}>
              {heroContent.cta.text}
            </Button>
          </div>

          <ParallaxProvider>
            <div className={styles.imageContainer}>
              <div className={styles.imageWrapper}>
                <Parallax className="h-full" translateY={heroContent.styles.parallaxRange.image}>
                  <Image
                    alt={heroContent.featuredImage.alt}
                    className="rounded-2xl"
                    layout="fill"
                    objectFit="cover"
                    src={heroContent.featuredImage.image}
                  />
                </Parallax>
              </div>
            </div>
          </ParallaxProvider>
        </div>
      </div>
    </header>
  );
};
