import React from "react";

import styles from "./styles.module.scss";
import { HeaderProps } from "@/types/components";

const Header: React.FC<HeaderProps> = ({ title, description, backgroundImage }) => {
  return (
    <section className={styles.container}>
      <img alt="header background" className={styles.image} src={backgroundImage} />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h2 className={`${styles.title} heading-2 font-bold`}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>
    </section>
  );
};

export default Header;
