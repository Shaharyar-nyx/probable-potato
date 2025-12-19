"use client";

import React from "react";
import Image from "next/image";
import styles from "./styles.module.scss";
import { Button } from "@/components";
import { getStrapiAssetUrl } from "@/lib";

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
    <section
      className={styles.container}
      style={
        background_file?.data?.attributes?.url
          ? ({
              // TS: cast so CSS var key is allowed
              ["--bg-url" as any]: `url(${getStrapiAssetUrl(background_file.data.attributes.url)})`,
              position: "relative",
              overflow: "hidden",
            } as React.CSSProperties)
          : { position: "relative", overflow: "hidden" }
      }
    >
      {/* Content goes here */}
      <div className={styles.overlay} />
      <div className={styles.inner}>
        {featured_image?.data?.attributes?.url && (
          <div className={styles.imageWrapper}>
            {/* Background behind featured image */}
            {featured_image?.data?.attributes?.url && (
              <Image
                src={getStrapiAssetUrl(featured_image.data.attributes.url)}
                alt="Featured"
                width={800}
                height={400}
                className={styles.featureImg}
              />
            )}

            {/* Foreground Featured Image */}
          </div>
        )}

        <div className={styles.content}>
          {headline && <h5 className={styles.feature}>{headline}</h5>}
          {title && <h2 className="mt-2 text-2xl font-bold">{title}</h2>}

          {(author_name || publish_date) && (
            <p className={styles.date_auth}>
              {author_name}
              {author_name && publish_date ? " | " : ""}
              {publish_date}
            </p>
          )}

          {description && (
            <p
              style={{
                overflow: "hidden",
                color: "var(--Primary-800, #02255B)",
                textOverflow: "ellipsis",
                fontFamily: "var(--Font-Family-Description, Poppins)",
                fontSize: "var(--Font-size-Size--M, 16px)",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "var(--Font-Height-Height-X, 24px)",
              }}
            >
              {description}
            </p>
          )}

          {cta_text && (
            <Button href={cta_url || "#"} className={styles.listenBtn} iconName="ArrowUpRightIcon">
              {cta_text}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};
