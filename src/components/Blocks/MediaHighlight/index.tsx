"use client";

import React from "react";
import Image from "next/image";
import styles from "./styles.module.scss";
import { Button } from "@/components";
import { STRAPI_ASSETS } from "@/lib";

export const MediaHighlight: React.FC<any> = ({
  background_file,
  featured_image,
  headline,
  title,
  author_name,
  publish_date,
  description,
  cta_text,
  cta_url,
}) => {
  return (
    <section className={styles.container} style={{ position: "relative", overflow: "hidden" }}>
      {/* Background Layer */}
      {background_file?.data?.attributes?.url && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `linear-gradient(
            180deg,
            #F6F7F8 0%,
            rgba(246, 247, 248, 0.00) 50%,
            #F6F7F8 100%
            
          ),
          linear-gradient(
            0deg,
            #F6F7F8 0%,
            rgba(246, 247, 248, 0.00) 50%,
            #F6F7F8 100%
          ),
           url(${STRAPI_ASSETS}${background_file.data.attributes.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: "blur(2px)",
            transform: "scale(1.05)",
            zIndex: -1,
          }}
        />
      )}
      {/* Content goes here */}


      <div className={styles.overlay} />
      <div className={styles.inner}>
        {featured_image?.data?.attributes?.url && (
          <div className={styles.imageWrapper}>
            {/* Background behind featured image */}
          {featured_image?.data?.attributes?.url && (
  <Image
    src={`${STRAPI_ASSETS}${featured_image.data.attributes.url}`}
    alt="Featured"
    width={800}   // apni requirement ke hisaab se set karo
    height={400}  // apni requirement ke hisaab se set karo
    className={styles.featureImg}
  />
)}


            {/* Foreground Featured Image */}

          </div>
        )}

        <div className={styles.content}>
          {headline && (
            <p className={styles.feature}>{headline}</p>
          )}
          {title && <h2 className="text-2xl font-bold mt-2">{title}</h2>}

          {(author_name || publish_date) && (
            <p className={styles.date_auth}>
              {author_name}
              {author_name && publish_date ? " | " : ""}
              {publish_date}
            </p>
          )}

          {description && <p style={{
            overflow: "hidden",
            color: "var(--Primary-800, #02255B)",
            textOverflow: "ellipsis",
            fontFamily: "var(--Font-Family-Description, Poppins)",
            fontSize: "var(--Font-size-Size--M, 16px)",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "var(--Font-Height-Height-X, 24px)",
          }}>{description}</p>}

          {cta_text && (
            <Button href={cta_url || "#"} className={styles.listenBtn}>
              {cta_text}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};
