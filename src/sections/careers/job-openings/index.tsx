"use client";

import React from "react";

import styles from "./styles.module.scss";

export const JobOpenings: React.FC<any> = ({ title, content }) => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1 className={`heading-1 ${styles.title}`}>{title}</h1>
        <p className={`paragraph-lg ${styles.description}`}>{content}</p>

        {/* <div className={styles.gridContent}>
          <p className={`paragraph-lg ${styles.columnHeader}`}>Job Title</p>
          <p className={`paragraph-lg ${styles.columnHeader}`}>Contract Type</p>
          <p className={`paragraph-lg ${styles.columnHeader}`}>Location</p>
          <div />

          {jobOpenings.map(({ title, contractType, location, link }, index) => (
            <React.Fragment key={index}>
              <h2 className={`heading-2 ${styles.row}`}>{title}</h2>
              <p className={`heading-7 ${styles.row}`}>{contractType}</p>
              <p className={`heading-7 ${styles.row}`}>{location}</p>
              <div className={styles.buttonWrapper}>
                <Button externalHref={link} variant="neutral">
                  Apply Now
                </Button>
              </div>
              {index !== jobOpenings.length - 1 && <div className={styles.divider} />}
            </React.Fragment>
          ))}
        </div> */}
      </div>
    </section>
  );
};
