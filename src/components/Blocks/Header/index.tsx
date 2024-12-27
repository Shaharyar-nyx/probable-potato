import styles from "./styles.module.css";
import { headerContent } from "@/data/header";

const Header = () => {
  return (
    <section className={styles.container}>
      <img alt="header background" className={styles.image} src={headerContent.backgroundImage.src} />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h1 className="text-h2 mb-5 text-white">{headerContent.title}</h1>
        <p className={styles.description}>{headerContent.description}</p>
      </div>
    </section>
  );
};

export default Header;
