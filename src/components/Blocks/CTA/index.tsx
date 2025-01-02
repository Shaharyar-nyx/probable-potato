"use client";

import Image from "next/image";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";

import styles from "./styles.module.scss";

type CTAProps = {
  backgroundImage: {
    src: string;
  };
  title: string;
  tagline?: string;
  description: string;
  buttonText: string;
  href?: string;
};

const CTA = ({ backgroundImage, description, title, tagline, buttonText, href }: CTAProps) => {
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
            {tagline && <span className="tagline text-white">{tagline}</span>}
            <h2 className={`heading-2 font-bold`}>{title}</h2>
            <p className={styles.description}>{description}</p>
            <div className={styles.buttonGroup}>
              <button className={styles.primaryButton}>{buttonText}</button>
            </div>
          </div>
        </div>
      </div>
    </ParallaxProvider>
  );
};

export default CTA;
