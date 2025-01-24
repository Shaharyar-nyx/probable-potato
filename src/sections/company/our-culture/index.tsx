import styles from "./styles.module.scss";
import { Button } from "@/components";
import { STRAPI_ASSETS } from "@/lib";
import Image from "next/image";

export const OurCulture: React.FC<any> = ({ title, content, headline, cta_text, cta_url, cards }) => {
  return (
    <section className={styles["our-culture"]}>
      <div className={styles.background} />
      <div className={styles.container}>
        <div className="w-full lg:w-1/2">
          <h2 className={`${styles.title} heading-2`}>{title}</h2>
          <p className={`${styles.paragraph} paragraph-md`}>{content}</p>
          <Button variant="neutral" href={cta_url} className="w-fit">
            {cta_text}
          </Button>
        </div>
        <div className="flex w-full flex-col lg:w-1/2">
          <h3 className="heading-7 mb-6 text-neutral-50">{headline}</h3>
          <div className="grid gap-6 lg:grid-cols-2">
            {cards.map(({ title, content, icon }: any, index: number) => (
              <div key={index} className={styles["feature-container"]}>
                <div className="flex items-center gap-3">
                  <div className="rounded-md bg-neutral-50">
                    <div className="flex h-8 w-8 items-center justify-center">
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
                <p className="paragraph-md text-neutral-50">{content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
