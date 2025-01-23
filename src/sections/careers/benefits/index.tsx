import styles from "./styles.module.scss";
import { STRAPI_ASSETS } from "@/lib";
import Image from "next/image";

export const Benefits: React.FC<any> = ({ title, content, headline, cards }) => {
  return (
    <section className={styles.section}>
      <div className={styles.background} />
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={`paragraph-sm ${styles.subtitle}`}>{headline}</p>
          <h1 className={`heading-1 ${styles.title}`}>{title}</h1>
          <p className="paragraph-md">{content}</p>
        </div>

        <div className={styles.gridContent}>
          {cards.map(({ title, icon }: any, index: number) => (
            <div key={index} className={styles.card}>
              <div className={styles.iconWrapper}>
                <div className="flex h-8 w-8 items-center justify-center">
                  <Image
                    alt={icon.data.attributes.name}
                    height={24}
                    width={24}
                    src={`${STRAPI_ASSETS}${icon.data.attributes.url}`}
                  />
                </div>
              </div>
              <h3 className={`heading-7 ${styles.cardTitle}`}>{title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
