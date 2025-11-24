"use client";

import React from "react";
import Image from "next/image";
import { STRAPI_ASSETS } from "@/lib";
import styles from "./dark.module.scss";
import { Brain  } from "lucide-react";

export const HeroDark: React.FC<any> = ({
  background_file,
  cta_text,
  cta_modal,
  cta_url,
  headline,
  content,
  featured_image,
  title,
  secondary_cta_text,
  secondary_cta_url,
}) => {
  return (
    <header className={styles.hero}>
      {/* === Background Video or Image === */}
      {background_file?.data?.attributes?.url && (
  <img
    className={styles.backgroundImage}
    src={`${STRAPI_ASSETS}${background_file.data.attributes.url}`}
    alt={background_file.data.attributes.alternativeText || "background"}
    aria-hidden="true"
  />
)}


      {/* === Overlay === */}
      <div className={styles.overlay} />

      {/* === Content === */}
      <div className={styles.container}>
        <div className={styles.left}>
          <h1 className={styles.title}>{title}</h1>
          <h5 className={styles.headline}>{headline}</h5>
          <p className={styles.subtitle}>{content}</p>

         <div className={styles.buttons}>
  <a
    href={cta_url || "#"}
    className={styles.primaryBtn}
  >
    {cta_text || "Get Started"}
  </a>

  <a
    href={secondary_cta_url || "#"}
    className={styles.secondaryBtn}
    target="_blank"
    rel="noopener noreferrer"
  >
    <Brain  className="w-5 h-5 inline mr-2" />
    {secondary_cta_text || "See How It Works"}
  </a>
</div>

        </div>

        <div className={styles.right}>
          {featured_image?.data?.attributes?.url && (
            <div className={styles.imageWrapper}>
              <Image
                src={`${STRAPI_ASSETS}${featured_image.data.attributes.url}`}
                alt={
                  featured_image?.data?.attributes?.alternativeText || "Hero image"
                }
                fill
                className={styles.image}
                sizes="(max-width: 768px) 100vw, 600px"
                priority
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
