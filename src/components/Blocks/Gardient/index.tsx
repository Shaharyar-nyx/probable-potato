import React from "react";

import elmStyles from "./styles.module.scss";
import clsx from "clsx";

export const Gardient: React.FC<any> = ({ styles }) => {
  return <span className={clsx(elmStyles.gradient, styles)}></span>;
};
