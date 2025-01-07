import { BenefitsProps } from "@/types";
import { IconRenderer } from "@/components";
import styles from "./styles.module.scss";

export const Benefits: React.FC<BenefitsProps> = ({ benefits, subtitle, title, description }) => {
  return (
    <section className={styles.section}>
      <div className={styles.background} />
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={`paragraph-sm ${styles.subtitle}`}>{subtitle}</p>
          <h1 className={`heading-1 ${styles.title}`}>{title}</h1>
          <p className="paragraph-md">{description}</p>
        </div>

        <div className={styles.gridContent}>
          {benefits.map(({ title, icon }, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.iconWrapper}>
                <IconRenderer className={styles.icon} iconName={icon} />
              </div>
              <h3 className={`heading-7 ${styles.cardTitle}`}>{title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
