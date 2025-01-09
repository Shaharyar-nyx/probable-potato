import React from "react";

import styles from "./styles.module.scss";
import { Button } from "@/components";
import { HeaderProps } from "@/types/components";
import Modal from "@/components/UI/modal";
import { DemoForm } from "@/sections";

export const Header: React.FC<HeaderProps> = ({ cta, tagline, title, description, backgroundImage }) => {
  return (
    <section className={styles.container}>
      <img alt="header background" className={styles.image} src={backgroundImage} />
      <div className={styles.overlay} />
      <div className={styles.content}>
        {tagline && <div className="tagline">{tagline}</div>}
        <h2 className="heading-2 max-w-screen-md font-bold">{title}</h2>
        <p className={`${styles.description} paragraph-lg`}>{description}</p>
        {cta && (
          <>
            {cta.isModal ? (
              <Modal cta={cta}>
                <DemoForm />
              </Modal>
            ) : (
              <Button className="w-fit" href={cta.link} iconName={cta.icon}>
                {cta.label}
              </Button>
            )}
          </>
        )}
      </div>
    </section>
  );
};
