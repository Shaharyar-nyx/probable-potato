import React from "react";

import styles from "./styles.module.css";
import { HeaderProps } from "@/types/components";

const Header: React.FC<HeaderProps> = ({ title, description, backgroundImage }) => {
  return (
    <section className={styles.container}>
      <img alt="header background" className={styles.image} src={backgroundImage} />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h1 className="text-h2 mb-5 text-white">{title}</h1>
        <p className={styles.description}>{description}</p>
      </div>
    </section>
  );
};

export default Header;
