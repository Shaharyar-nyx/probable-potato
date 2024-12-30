"use client";

import Image from "next/image";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";

import styles from "./styles.module.scss";
import { heroContent } from "@/data/hero";

const Hero = () => {
  return (
    <header className={styles.header}>
      <div className={styles.backgroundWrapper}>
        <Image alt="background animation" fill priority src={heroContent.backgroundVideo} />
      </div>
      <div className={styles.overlay} />
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h1 className={styles.title}>{heroContent.title}</h1>
            <p className={styles.description}>{heroContent.description}</p>
            <button className={styles.ctaButton}>
              {heroContent.cta.text}
              <Image alt="arrow up right" height={24} src={heroContent.cta.icon} width={24} />
            </button>
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

                <Parallax className="absolute bottom-[45%] left-8" translateY={heroContent.styles.parallaxRange.label}>
                  <div className={styles.label}>{heroContent.featuredImage.monitoringLabel}</div>
                </Parallax>
              </div>
            </div>
          </ParallaxProvider>
        </div>
      </div>
    </header>
  );
};

export default Hero;
