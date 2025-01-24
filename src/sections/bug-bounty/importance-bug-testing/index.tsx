import styles from "./styles.module.scss";
import { STRAPI_ASSETS } from "@/lib";
import Image from "next/image";

export const ImportanceBugTesting: React.FC<any> = ({ headline, title, content, cards }) => {
  return (
    <section className={styles["importance-bug-testing"]}>
      <div className={styles.background} />
      <div className={styles.container}>
        <div className="lg:w-1/2">
          <div className="tagline mb-10 text-primary-800">{headline}</div>
          <h2 className={`${styles.title} heading-2`}>{title}</h2>
          <p className={`${styles.paragraph} paragraph-md`}>{content}</p>
        </div>
        <div className="flex flex-col lg:w-1/2">
          <div className="grid gap-6 lg:grid-cols-2">
            {cards.map(({ title, content, icon }: any, index: number) => (
              <div key={index} className={styles["feature-container"]}>
                <div className="flex items-center gap-3">
                  <div className="rounded-md bg-primary-500">
                    <div className="flex h-8 w-8 items-center justify-center">
                      <Image
                        alt={icon.data.attributes.name}
                        height={24}
                        width={24}
                        src={`${STRAPI_ASSETS}${icon.data.attributes.url}`}
                      />
                    </div>
                  </div>
                  <h3 className="heading-7 font-bold text-primary-800">{title}</h3>
                </div>
                <p className="paragraph-md text-primary-800">{content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
