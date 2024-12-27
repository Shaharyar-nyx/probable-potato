import styles from "./styles.module.css";
import { headerContent } from "@/data/header";

const Header = () => {
  return (
    <section className={styles.container}>
      <img
        src={headerContent.backgroundImage.src}
        alt="header background"
        className={styles.image}
      />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h1 className={`${styles.title} font-primaryBold`}>{headerContent.title}</h1>
        <p className={styles.description}>{headerContent.description}</p>
      </div>
    </section>
  );
};

export default Header;
