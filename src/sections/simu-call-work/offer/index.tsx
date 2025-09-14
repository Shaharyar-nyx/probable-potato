"use client";
import Image from "next/image";
import { STRAPI_ASSETS } from "@/lib";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";


type WorkItem = {
  icon: {
    data?: {
      attributes: {
        url: string;
        alternativeText?: string;
      };
    };
  };
  heading: string;
  description: string;
};

type SimuCallOfferingsProps = {
  sub_heading: string;
  heading: string;
  page_description: string;
  background_file?: {
    data?: {
      attributes: {
        url: string;
        alternativeText?: string;
      };
    };
  };
  featureImage?: {
    data?: {
      attributes: {
        url: string;
        alternativeText?: string;
      };
    };
  };
  bgUrlMob: {
    data?: {
      attributes: {
        url: string;
        alternativeText?: string;
      };
    };
  };
  offering: WorkItem[];
};

export default function Offer({
  sub_heading,
  heading,
  page_description,
  background_file,
  featureImage,
  bgUrlMob,
  offering,
}: SimuCallOfferingsProps) {
  // Background
  const bgUrl = background_file?.data?.attributes?.url || "";
  const bgUrlMobs = bgUrlMob?.data?.attributes?.url || "";

  const featureImgUrl = featureImage?.data?.attributes?.url || "";
  const featureAlt = featureImage?.data?.attributes?.alternativeText || "Feature Image";
  const [background, setBackground] = useState(bgUrl);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const handleChange = () => {
      setBackground(mediaQuery.matches ? bgUrlMobs : bgUrl);
    };

    handleChange(); // run once
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [bgUrl, bgUrlMobs]);


  return (
    <section
      className={styles.featuredSection}
      style={{
        backgroundImage: `url(${STRAPI_ASSETS}${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className={styles.overlay}></div>

      <div className={styles.content}>
        {/* Sub heading */}
        <p className={styles.subHeading}>{sub_heading}</p>

        {/* Main heading */}
        <h2 className={styles.mainHeading}>{heading}</h2>

        {/* Description */}
        <p className={styles.description}>{page_description}</p>

        {/* Cards + Image Wrapper */}
        <div className={styles.cardsImageWrapper}>
          {/* Left: Cards */}
          <div className={styles.cardsGrid}>
            {offering?.map((item, idx) => {
              const iconUrl = item.icon?.data?.attributes?.url || "";
              const altText = item.icon?.data?.attributes?.alternativeText || "";

              return (
                <div key={idx} className={styles.card}>
                  <div className={styles.cardHeader}>
                    <div className={styles.iconWrapper}>
                      {iconUrl && (
                        <Image
                          src={`${STRAPI_ASSETS}${iconUrl}`}
                          alt={altText || item.heading}
                          width={24}
                          height={24}
                          className={styles.iconImg}
                        />
                      )}
                    </div>
                    <h3 className={styles.cardHeading}>{item.heading}</h3>


                  </div>
                  <p className={styles.cardDescription}>{item.description}</p>
                </div>
              );
            })}
          </div>

          {/* Right: Image */}
          <div className={styles.sideImageWrapper}>
            {featureImgUrl && (
              <div className={styles.rightImage}>
                <Image
                  src={`${STRAPI_ASSETS}${featureImgUrl}`}
                  alt={featureAlt}
                  width={500}
                  height={500}
                  className={styles.featureImg}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export { Offer };