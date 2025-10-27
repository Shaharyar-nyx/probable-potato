"use client";
import React from "react";
import Image from "next/image";
import styles from "./styles.module.scss";

type ImageType = {
  data?: {
    attributes?: {
      url: string;
      alternativeText?: string;
    };
  };
};

type Outcome = {
  title: any;
  description: any;
  icon?: ImageType;
};

type KeyOutcomesProps = {
  side_heading?: any;
  background_file?: ImageType;
  outcome?: Outcome[];
};

// 🔹 Extract text helper
const getText = (value: any): string => {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(getText).join(" ");
  if (typeof value === "object") {
    if (value.text) return value.text;
    if (value.children) return value.children.map(getText).join(" ");
  }
  return "";
};

const getImageUrl = (path?: string) => {
  if (!path) return "";

  // Remove trailing slash from env URL
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_ASSETS?.replace(/\/$/, "") || "";

  // If full http(s) URL — just return as is
  if (/^https?:\/\//i.test(path)) return path;

  // If Strapi relative path — prepend base URL
  if (path.startsWith("/uploads")) {
    return `${baseUrl}${path}`;
  }

  // If local /public image — return as is
  return path.startsWith("/") ? path : `/${path}`;
};



export default function KeyOutcomes({
  side_heading,
  background_file,
  outcome = [],
}: KeyOutcomesProps) {
  const bgImageUrl = getImageUrl(background_file?.data?.attributes?.url || "images/back.jpg");

  return (
    <section
      className={styles.keyOutcomes}
      style={{
        backgroundImage: bgImageUrl ? `url(${bgImageUrl})` : "none",
      }}
    >
      <div className={styles.container}>
        <div className={styles.left}>
          {side_heading && <h2 className={styles.heading}>{getText(side_heading)}</h2>}
        </div>

        <div className={styles.right}>
          <div className={styles.grid}>
            {outcome.map((item, i) => (
              <div key={i} className={styles.card}>
                <div className={styles.topRow}>
                  <div className={styles.iconBox}>
                    {item.icon?.data?.attributes?.url && (
                      <Image
                        src={getImageUrl(item.icon.data.attributes.url)}
                        alt={item.icon.data.attributes.alternativeText || "icon"}
                        width={48}
                        height={48}
                      />
                    )}
                  </div>
                  <h3 className={styles.title}>{getText(item.title)}</h3>
                </div>
                <p className={styles.description}>{getText(item.description)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export { KeyOutcomes };
