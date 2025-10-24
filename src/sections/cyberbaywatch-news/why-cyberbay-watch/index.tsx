"use client";
import Image from "next/image";
import { STRAPI_ASSETS } from "@/lib";
import styles from "./styles.module.scss";

type WhyCyberWatchProps = {
  heading: string;
  description?: string | null;
  content?: string;
  side_image?: {
    data?: {
      attributes?: {
        url?: string;
        alternativeText?: string;
      };
    };
  };
};

export default function WhyCyberWatch({
  heading,
  description,
  content,
  side_image,
}: WhyCyberWatchProps) {
  const imageUrl =
    side_image?.data?.attributes?.url
      ? `${STRAPI_ASSETS}${side_image.data.attributes.url}`
      : null;

  return (
    <section className={styles.whySection}>
      <div className={styles.container}>
        <div className={styles.textBox}>
          <h2 className={styles.title}>{heading}</h2>
          {description && <p className={styles.description}>{description}</p>}
          {content && <p className={styles.content}>{content}</p>}
        </div>

        {imageUrl && (
          <div className={styles.imageBox}>
            <Image
              src={imageUrl}
              alt={side_image?.data?.attributes?.alternativeText || "CyberWatch"}
              width={560}
              height={560}
              className={styles.image}
            />
          </div>
        )}
      </div>
    </section>
  );
}

export { WhyCyberWatch };
