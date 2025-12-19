import { Button } from "@/components";
import { MultiCardSection } from "@/types";
import styles from "./styles.module.scss";
import { getStrapiAssetUrl } from "@/lib";

export function CyberLeadership(data: MultiCardSection) {
  // Use the actual data from CMS, but keep the hardcoded content as fallback
  const title = data?.title || "Ready to Strengthen Your Cyber Leadership?";
  const content =
    data?.content ||
    "Nyxlab's vCISO Advisory Service gives you strategic guidance, governance, and independent assurance — without the cost of a full-time CISO.";
  const ctaText = data?.cta_text || "Reach Out to Learn More";

  return (
    <section className={styles.container}>
      {/* Background with cyber network graphics */}
      <div
        className={styles.backgroundWrapper}
        style={{ backgroundImage: `url(getStrapiAssetUrl(data?.background_file.data?.attributes?.url))` }}
      ></div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.contentCard}>
          <div className={styles.textContent}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.description}>{content}</p>

            <Button href={data?.cta_url as string} variant="primary" size="large" iconName={"ArrowUpRightIcon"}>
              {ctaText}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
