import React from "react";

import styles from "./styles.module.scss";
import Button from "@/components/Button";
import benefitsData from "@/data/bug-hunters/benefits.json";
import joinData from "@/data/bug-hunters/join.json";

export const KeyBenefits: React.FC = () => {
  return (
    <section className="relative">
      <div className={styles.background} />
      <div className={`${styles.container} ${styles["join-container"]}`}>
        <div className="w-[32%]">
          <h2 className="text-h2 mb-5 text-neutral-50">{joinData.title}</h2>
          <p className="text-p mb-9 text-neutral-50">{joinData.text}</p>
          <Button className="w-[160px]">Join Now!</Button>
        </div>
        <div className="w-[66%]">Hello world</div>
      </div>
      <div className={`${styles.container} pb-[120px] pt-[20px]`}>Key Benefits</div>
    </section>
  );
};
