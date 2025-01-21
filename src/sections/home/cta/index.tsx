"use client";

import React from "react";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";

import styles from "./styles.module.scss";
import { Button } from "@/components";
import Modal from "@/components/UI/modal";
import { DemoForm } from "../demo-form";
import { STRAPI_ASSETS } from "@/lib";

export const CTA: React.FC<any> = ({ background_file, headline, card }) => {
  const cta = {
    label: card.cta_text,
    isModal: true,
    icon: "ArrowUpRightIcon",
    link: card.cta_url,
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
            <h2 className={`heading-2 font-bold`}>{card.title}</h2>
            <p className={styles.description}>{card.content}</p>
            {card.cta_text && (
              <>
                {cta?.isModal ? (
                  <Modal cta={cta}>
                    <DemoForm />
                  </Modal>
                ) : (
                  <Button className="w-fit" href={cta?.link} iconName={cta?.icon}>
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
