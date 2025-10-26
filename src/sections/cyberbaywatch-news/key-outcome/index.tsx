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

// 🔹 Helper to safely extract text
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

// 🔹 Helper for image paths (works for both Strapi + public folder)
const getImageUrl = (path: string | undefined) => {
  if (!path) return "";

  // If path is already an absolute URL (Strapi returns full URL)
  if (path.startsWith("https")) return path;

  // If it’s a Strapi relative upload (like /uploads/xyz.png)
  if (path.startsWith("/uploads")) {
    return `${process.env.NEXT_PUBLIC_STRAPI_URL || "https://www.cyberbay.tech/"}${path}`;
  }

  // Otherwise assume it's inside /public/
  return path.startsWith("/") ? path : `/${path}`;
};


export default function KeyOutcomes({
  side_heading,
  background_file,
  outcome = [],
}: KeyOutcomesProps) {
  // Static image from /public/images/back.jpg
  const bgImageUrl = getImageUrl("images/back.jpg");

  return (
    <section
      className={styles.keyOutcomes}
      style={{
        backgroundImage: bgImageUrl ? `url(${bgImageUrl})` : "none",
      }}
    >
      <div className={styles.container}>
        {/* Left Section */}
        <div className={styles.left}>
          {side_heading && (
            <h2 className={styles.heading}>{getText(side_heading)}</h2>
          )}
        </div>

        {/* Right Section */}
        <div className={styles.right}>
          <div className={styles.grid}>
            {outcome.map((item, i) => (
              <div key={i} className={styles.card}>
                <div className={styles.topRow}>
                  <div className={styles.iconBox}>
                    {item.icon?.data?.attributes?.url && (
                      <Image
                        src={getImageUrl(item.icon.data.attributes.url)}
                        alt={
                          item.icon.data.attributes.alternativeText || "icon"
                        }
                        width={24}
                        height={24}
                      />
                    )}
                  </div>
                  <h3 className={styles.title}>{getText(item.title)}</h3>
                </div>
                <p className={styles.description}>
                  {getText(item.description)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export { KeyOutcomes };
