import clsx from "clsx";
import React from "react";

import styles from "./styles.module.scss";
import { ButtonProps } from "@/types";

export const Button: React.FC<ButtonProps> = ({
  children,
  loading = false,
  icon,
  variant = "primary",
  size = "large",
  transparent = false,
  className,
  ...props
}) => {
  return (
    <button
      className={clsx(
        styles.btn,
        styles[`btn-${size}`],
        {
          [styles[`btn-${variant}`]]: !transparent,
          [styles[`btn-${variant}-transparent`]]: transparent,
        },
        className,
      )}
      {...props}
    >
      {!loading ? (
        <>
          <span>{children}</span>
          {icon !== undefined && icon}
        </>
      ) : (
        <span>Loading...</span>
      )}
    </button>
  );
};

export default Button;
