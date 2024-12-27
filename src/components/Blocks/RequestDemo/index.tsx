import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import styles from "./styles.module.css";
import Image from "next/image";
import { requestDemoContent } from "@/data/requestDemo";

interface RequestDemoProps {
  content?: typeof requestDemoContent;
}

const RequestDemo = ({ content = requestDemoContent }: RequestDemoProps) => {
  return (
    <ParallaxProvider>
      <div className={styles.container}>
        <div className={styles.backgroundWrapper}>
          <Parallax translateY={[-20, 20]} className={styles.parallaxWrapper}>
            <img src={content.banner.src} alt={content.banner.alt} className={styles.banner} />
          </Parallax>
          <div className={styles.overlay} />
        </div>

        <div className={styles.content}>
          {/* Left Content */}
          <div className={styles.contentLeft}>
            <h1 className={`${styles.title} font-primaryBold`}>
              {content.title}
            </h1>
            <p className={styles.subtitle}>
              {content.subtitle}
            </p>
            <div className={styles.buttonGroup}>
              <button className={styles.primaryButton}>
                {content.buttonText}{" "}
                <span>
                  <Image
                    src={content.arrowIcon.src}
                    alt={content.arrowIcon.alt}
                    width={content.arrowIcon.width}
                    height={content.arrowIcon.height}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </ParallaxProvider>
  );
};

export default RequestDemo;
