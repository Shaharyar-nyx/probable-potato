"use client";

import React from "react";

import styles from "./styles.module.scss";
import clsx from "clsx";
import { BlogCategoryType } from "@/types";
import { Dropdown } from "@/components";

export const BlogCategoryListMobile: React.FC<{ list: BlogCategoryType[]; onSelect: (id: string) => void }> = ({
  list,
  onSelect,
}) => {
  const arr = list.map((item) => item.name);
  const handleSelect = (name: string | string[]) => {
    if (Array.isArray(name)) {
      name = name[0];
    }
    onSelect(name as string);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <Dropdown
            multiple={false}
            iconName="BarsArrowUpIcon"
            id="request"
            label="Categories"
            options={arr}
            handleChange={(value: string | string[]) => handleSelect(value)}
          />
        </div>
      </div>
    </section>
  );
};
