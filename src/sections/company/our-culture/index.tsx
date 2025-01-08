import styles from "./styles.module.scss";
import { Button, IconRenderer } from "@/components";
import { OurCultureProps } from "@/types";

export const OurCulture: React.FC<OurCultureProps> = ({ title, content, buttonText, coreTitle, features }) => {
  return (
    <section className={styles["our-culture"]}>
      <div className={styles.background} />
      <div className={styles.container}>
        <div className="w-full lg:w-1/2">
          <h2 className={`${styles.title} heading-2`}>{title}</h2>
          <p className={`${styles.paragraph} paragraph-md`}>{content}</p>
          <Button variant="neutral" href="/careers" className="w-fit">{buttonText}</Button>
        </div>
        <div className="flex w-full lg:w-1/2 flex-col">
          <h3 className="heading-7 mb-6 text-neutral-50">{coreTitle}</h3>
          <div className="grid lg:grid-cols-2 gap-6">
            {features.map((feature, id) => (
              <div key={id} className={styles["feature-container"]}>
                <div className="flex items-center gap-3">
                  <div className="rounded-md bg-neutral-50 p-1">
                    <IconRenderer className="h-[24px] w-[24px] text-primary-500" iconName={feature.icon} />
                  </div>
                  <h3 className="heading-7 font-bold text-neutral-50">{feature.title}</h3>
                </div>
                <p className="paragraph-md text-neutral-50">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
