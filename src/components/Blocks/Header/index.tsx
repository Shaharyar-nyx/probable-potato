import Image from "next/image";
import React from "react";

import styles from "./styles.module.scss";
import { Button } from "@/components/UI";
import { HeaderProps } from "@/types/components";

export const Header: React.FC<HeaderProps> = ({ title, description, backgroundImage, buttonText, tagline, link }) => {
  return (
    <section className={styles.container}>
      <img alt="header background" className={styles.image} src={backgroundImage} />
      <div className={styles.overlay} />
      <div className={styles.content}>
        {tagline && <div className="tagline">{tagline}</div>}
        <h2 className={`heading-2 font-bold`}>{title}</h2>
        <p className={styles.description}>{description}</p>
        {buttonText && (
          <Button
            externalHref={undefined}
            href={link}
            icon={<Image alt="arrow up right" height={24} src="/images/arrow-up-right.svg" width={24} />}
          >
            {buttonText}
          </Button>
        )}
      </div>
    </section>
  );
};
