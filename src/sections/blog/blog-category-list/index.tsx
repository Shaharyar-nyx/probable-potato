"use client";

import React, { useState } from "react";

import styles from "./styles.module.scss";
import clsx from "clsx";
import { BlogCategoryType } from "@/types";

export const BlogCategoryList: React.FC<{ list: BlogCategoryType[]; onSelect: (id: string) => void }> = ({
  list,
  onSelect,
}) => {
  const [selected, setSelected] = useState("");

  const handleSelect = (name: string) => {
    setSelected(name);
    onSelect(name);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <ul className={styles.list}>
            <li className={clsx(styles.listItem, styles.listFirst)}>Categories</li>
            {list.map((item: BlogCategoryType) => {
              const isSelected = selected === item.name;
              return (
                <li
                  key={item.id}
                  className={clsx(styles.listItem, { [styles.listSelected]: isSelected })}
                  onClick={() => handleSelect(item.name)}
                >
                  {item.name}
                </li>
              );
            })}
            <li className={clsx(styles.listFirst, styles.listItem)}></li>
          </ul>
        </div>
      </div>
    </section>
  );
};
