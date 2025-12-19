"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react"; // Icon for contact button
import styles from "./styles.module.scss";
import { getStrapiAssetUrl } from "@/lib";

interface BackgroundFile {
  data?: {
    attributes?: {
      url?: string;
      alternativeText?: string;
    };
  };
}

interface homeCtaContent {
  title?: string;
  description?: string;
  cta_one?: string;
  cta_one_url?: string;
  cta_two?: string;
  cta_two_url?: string;
}

interface CallToActionSectionProps {
  background_file?: BackgroundFile;
  homeCta?: homeCtaContent | { data?: { attributes?: homeCtaContent } };
  [key: string]: any;
}

export const CallToAction: React.FC<CallToActionSectionProps> = ({
  background_file,
  homeCta,
}) => {
  const cta =
    (homeCta as any)?.data?.attributes || (homeCta as homeCtaContent) || {};

  const bgImage = background_file?.data?.attributes?.url
    ? getStrapiAssetUrl(background_file.data.attributes.url)
    : "/images/default-bg.jpg";

  return (
    <section className={styles.ctaSection}>
      {/* Background */}
      <div className={styles.background}>
        <Image
          src={bgImage}
          alt={
            background_file?.data?.attributes?.alternativeText ||
            "Background image"
          }
          fill
          className={styles.bgImage}
          priority
        />
        <div className={styles.overlay} />
      </div>

      {/* Content */}
      <div className={styles.content}>
        {cta?.title && <h2 className={styles.title}>{cta.title}</h2>}
        {cta?.description && <p className={styles.description}>{cta.description}</p>
}

        <div className={styles.btnGroup}>
          {cta?.cta_one && cta?.cta_one_url && (
            <Link href={cta.cta_one_url} className={`${styles.btn} ${styles.primary}`}>
              {cta.cta_one}
            </Link>
          )}
          {cta?.cta_two && cta?.cta_two_url && (
            <Link href={cta.cta_two_url} className={`${styles.btn} ${styles.outline}`}>
              <Phone size={18} className={styles.icon} />
              {cta.cta_two}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};
