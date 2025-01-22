import React from "react";

import styles from "./styles.module.scss";
import { Button } from "@/components";
import Modal from "@/components/UI/modal";
import { DemoForm } from "@/sections/home/demo-form";
import { ReportForm } from "@/sections/home/report-form";
import { STRAPI_ASSETS } from "@/lib";

export const Header: React.FC<any> = ({ background_file, card: { cta_text, cta_url, content, headline, title } }) => {
  const cta = {
    label: cta_text,
    isModal: true,
    icon: "ArrowUpRightIcon",
    link: cta_url,
  };

  return (
    <section className={styles.container}>
      <img
        alt="header background"
        className={styles.image}
        src={`${STRAPI_ASSETS}${background_file?.data?.attributes?.url}`}
      />
      <div className={styles.overlay} />
      <div className={styles.content}>
        {headline && <div className="tagline">{headline}</div>}
        <h2 className="heading-2 max-w-screen-md font-bold">{title}</h2>
        <p className={`${styles.description} paragraph-lg`}>{content}</p>
        {cta_text && (
          <>
            {cta.isModal ? (
              <Modal cta={cta}>
                {title === "CyberScan: Your All-in-One Solution for Continuous Security Monitoring" ? (
                  <ReportForm />
                ) : (
                  <DemoForm />
                )}
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
