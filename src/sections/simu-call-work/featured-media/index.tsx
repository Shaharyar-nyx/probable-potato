"use client";
import Image from "next/image";
import { STRAPI_ASSETS } from "@/lib";
import styles from "./styles.module.scss";

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

type SimuCallWorksProps = {
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
  works: WorkItem[];
};

export default function FeaturedMedia({
  sub_heading,
  heading,
  page_description,
  background_file,
  works,
}: SimuCallWorksProps) {
  const bgUrl =
    background_file?.data?.attributes?.url
      ? background_file.data.attributes.url
      : "";

  return (
   <section
    className={styles.featuredSection}
    style={{
    backgroundImage: bgUrl
      ? `linear-gradient(180deg, #F6F7F8 0%, rgba(246,247,248,0) 50%, #F6F7F8 100%), url(${STRAPI_ASSETS}${bgUrl})`
      : "linear-gradient(180deg, #F6F7F8 0%, rgba(246,247,248,0) 50%, #F6F7F8 100%)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
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

        {/* Cards */}
        <div className={styles.cardsGrid}>
          {works?.map((item, idx) => {
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
      </div>
    </section>
  );
}

export { FeaturedMedia };
