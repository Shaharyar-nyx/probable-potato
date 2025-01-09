"use client";

import Image from "next/image";
import React from "react";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";

import styles from "./styles.module.scss";
import { HeroProps } from "@/types";
import Modal from "@/components/UI/modal";
import { DemoForm } from "@/sections";

export const Hero: React.FC<HeroProps> = ({ backgroundVideo, cta, description, featuredImage, title }) => {
  return (
    <header className={styles.header}>
      <div className={styles.backgroundWrapper}>
        <Image alt="background animation" fill priority src={backgroundVideo} />
      </div>
      <div className={styles.overlay} />
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <div className={`${styles.title} display-1 font-bold`}>{title}</div>
            <p className={`${styles.description} paragraph-lg`}>{description}</p>
            {cta && (
              <Modal cta={cta}>
                <DemoForm />
              </Modal>
            )}
          </div>

          <ParallaxProvider>
            <div className={styles.imageContainer}>
              <div className={styles.imageWrapper}>
                <Parallax className="h-full" translateY={[-20, 20]}>
                  <Image
                    alt={featuredImage.alt}
                    className="rounded-2xl"
                    layout="fill"
                    objectFit="cover"
                    src={featuredImage.image}
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
