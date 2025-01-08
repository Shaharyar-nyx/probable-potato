import styles from "./styles.module.scss";
import { IconRenderer } from "@/components";
import { ImportanceBugTestingProps } from "@/types";

export const ImportanceBugTesting: React.FC<ImportanceBugTestingProps> = ({ tagline, title, content, features }) => {
  return (
    <section className={styles["importance-bug-testing"]}>
      <div className={styles.background} />
      <div className={styles.container}>
        <div className="lg:w-1/2">
          <div className="tagline mb-10 text-primary-800">{tagline}</div>
          <h2 className={`${styles.title} heading-2`}>{title}</h2>
          <p className={`${styles.paragraph} paragraph-md`}>{content}</p>
        </div>
        <div className="flex lg:w-1/2 flex-col">
          <div className="grid lg:grid-cols-2 gap-6">
            {features.map((feature, id) => (
              <div key={id} className={styles["feature-container"]}>
                <div className="flex items-center gap-3">
                  <div className="rounded-md bg-primary-500 p-1">
                    <IconRenderer className="h-[24px] w-[24px] text-neutral-50" iconName={feature.icon} />
                  </div>
                  <h3 className="heading-7 font-bold text-primary-800">{feature.title}</h3>
                </div>
                <p className="paragraph-md text-primary-800">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
