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
  const [currentCategory, setCurrentCategory] = React.useState<string>("");
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
          <div className={clsx(styles.listFirst, styles.mobile)}>Categories</div>
          <Dropdown
            multiple={false}
            id="select-category"
            label="Select category"
            options={arr}
            value={currentCategory}
            handleChange={(value: string | string[]) => {
              setCurrentCategory(value as string);
              handleSelect(value);
            }}
          />
        </div>
      </div>
    </section>
  );
};
