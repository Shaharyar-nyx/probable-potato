"use client";

import React from "react";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";

import styles from "./styles.module.scss";
import { Button } from "@/components";
import Modal from "@/components/UI/modal";
import { STRAPI_ASSETS } from "@/lib";
import { useIsMobile } from "@/hooks";

export const CTA: React.FC<any> = ({
  background_file,
  headline,
  card: { cta_text, cta_url, cta_modal, content, title },
}) => {
  const isMobile = useIsMobile();
  const cta = {
    label: cta_text,
    isModal: cta_modal,
    icon: "ArrowUpRightIcon",
    link: cta_url,
  };

  return (
    <ParallaxProvider>
      <div className={styles.container}>
        <div className={styles.backgroundWrapper}>
          <Parallax className={styles.parallaxWrapper} translateY={[-20, 20]}>
            <img
              alt={background_file?.data?.attributes?.name}
              className={styles.banner}
              src={`${STRAPI_ASSETS}${background_file?.data?.attributes?.url}`}
            />
          </Parallax>
          <div className={styles.overlay} />
        </div>

        <div className={styles.content}>
          {/* Left Content */}
          <div className={styles.contentLeft}>
            {headline !== null && <span className="tagline text-white">{headline}</span>}
            <h2 className={`${isMobile ? "heading-7" : "heading-2"} font-bold`}>{title}</h2>
            <p className={`${isMobile ? "paragraph-md" : "paragraph-lg"}`}>{content}</p>
            {cta_text && (
              <>
                {cta?.isModal ? (
                  <Modal cta={cta} buttonStyle={`${isMobile ? "!mt-6 w-full paragraph-md" : "w-fit"}`} />
                ) : (
                  <Button className="!mt-6 w-full lg:w-fit" href={cta?.link} target="_blank" iconName={cta?.icon}>
                    {cta?.label}
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </ParallaxProvider>
  );
};

export default CTA;
