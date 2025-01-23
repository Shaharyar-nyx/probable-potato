import styles from "./styles.module.scss";
import { STRAPI_ASSETS } from "@/lib";
import Image from "next/image";

export const FindingBugBounty: React.FC<any> = ({ headline, title, content, cards }) => {
  return (
    <section className={styles["finding-bug-bounty"]}>
      <div className={styles.background} />
      <div className={styles.container}>
        <div className={styles["content-wrapper"]}>
          <div className="tagline mb-10">{headline}</div>
          <h2 className="heading-2 mb-6 font-bold text-neutral-50">{title}</h2>
          <p className="paragraph-md text-neutral-50">{content}</p>
        </div>
        <div className={styles.content}>
          <div className={styles["features-grid"]}>
            {cards.map(({ title, content, icon }: any, index: number) => (
              <div key={index} className={styles["feature-row"]}>
                <div className={styles["feature-icon-container"]}>
                  <div className={styles["icon-wrapper"]}>
                    <div className={styles["icon-background"]}>
                      <div className="flex items-center justify-center h-8 w-8">
                        <Image
                          alt={icon.data.attributes.name}
                          height={24}
                          width={24}
                          src={`${STRAPI_ASSETS}${icon.data.attributes.url}`}
                        />
                      </div>
                    </div>
                    <h3 className="heading-7 font-bold text-neutral-50">{title}</h3>
                  </div>
                </div>

                <div className={styles["feature-text-container"]}>
                  <p className="paragraph-md text-neutral-50">{content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
