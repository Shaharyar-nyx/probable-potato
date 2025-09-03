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
    <section
      className={styles.container}
      style={{
        backgroundImage: background_file?.data?.attributes?.url
          ? `url(${STRAPI_ASSETS}${background_file.data.attributes.url})`
          : "none",
      }}
    >
      <div className={styles.overlay} />
      <div className={styles.inner}>
        {featured_image?.data?.attributes?.url && (
          <div className={styles.imageWrapper}>
            <Image
              src={`${STRAPI_ASSETS}${featured_image.data.attributes.url}`}
              alt={title || "featured image"}
              width={400}
              height={400}
              className="rounded-xl object-cover"
            />
          </div>
        )}

        <div className={styles.content}>
          {headline && <p className="text-blue-600 font-semibold">{headline}</p>}
          {title && <h2 className="text-2xl font-bold mt-2">{title}</h2>}

          {(author_name || publish_date) && (
            <p className="text-sm text-gray-500 mt-1">
              {author_name}
              {author_name && publish_date ? " | " : ""}
              {publish_date}
            </p>
          )}

          {description && <p className="text-base mt-3">{description}</p>}

       {cta_text && (
  <Button 
    href={cta_url || "#"} 
    className="mt-4 w-auto px-4 py-1 text-sm"
  >
    {cta_text}
  </Button>
)}
        </div>
      </div>
    </section>
  );
};
