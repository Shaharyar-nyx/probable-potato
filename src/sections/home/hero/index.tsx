"use client";

import Image from "next/image";
import React from "react";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";

import styles from "./styles.module.scss";
import Modal from "@/components/UI/modal";
import { STRAPI_ASSETS } from "@/lib";

export const Hero: React.FC<any> = ({ background_file, cta_text, cta_modal, cta_url, content, featured_image, title }) => {
  const cta = {
    label: cta_text,
    isModal: cta_modal,
    icon: "ArrowUpRightIcon",
    link: cta_url,
  };

  return (
    <header className={styles.header}>
      <div className={styles.backgroundWrapper}>
        <video
          src={`${STRAPI_ASSETS}${background_file?.data?.attributes?.url}`}
          playsInline
          preload="true"
          loop
          muted
          autoPlay
          aria-hidden="true"
          className="z-20"
        />
      </div>
      <div className={styles.overlay} />
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <div className={`${styles.title} display-1 font-bold`}>{title}</div>
            <p className={`${styles.description} paragraph-lg`}>{content}</p>
            {cta_text && <Modal cta={cta} buttonStyle="mx-auto lg:mx-0" />}
          </div>

          <ParallaxProvider>
            <div className={styles.imageContainer}>
              <div className={styles.imageWrapper}>
                <Parallax className="h-full" translateY={[-20, 20]}>
                  <Image
                    alt={featured_image?.data?.attributes?.name}
                    className="rounded-2xl"
                    layout="fill"
                    objectFit="cover"
                    src={`${STRAPI_ASSETS}${featured_image?.data?.attributes?.url}`}
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
