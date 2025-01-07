import styles from "./styles.module.scss";
import { IconRenderer } from "@/components";
import { FindingBugBountyProps } from "@/types";

export const FindingBugBounty: React.FC<FindingBugBountyProps> = ({ tagline, title, content, features }) => {
  return (
    <section className={styles["finding-bug-bounty"]}>
      <div className={styles.background} />
      <div className={styles["content-wrapper"]}>
        <div className="tagline mb-10">{tagline}</div>
        <h2 className="heading-2 mb-6 font-bold text-neutral-50">{title}</h2>
        <p className="paragraph-md text-neutral-50">{content}</p>
      </div>
      <div className={styles.container}>
        <div className={styles["features-grid"]}>
          {features.map((feature, id) => (
            <div key={id} className={styles["feature-row"]}>
              <div className={styles["feature-icon-container"]}>
                <div className={styles["icon-wrapper"]}>
                  <div className={styles["icon-background"]}>
                    <IconRenderer className={styles.icon} iconName={feature.icon} />
                  </div>
                  <h3 className="heading-7 font-bold text-neutral-50">{feature.title}</h3>
                </div>
              </div>

              <div className={styles["feature-text-container"]}>
                <p className="paragraph-md text-neutral-50">{feature.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
