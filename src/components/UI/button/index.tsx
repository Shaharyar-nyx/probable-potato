import clsx from "clsx";
import Link from "next/link";
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
  href,
  externalHref,
  className,
  ...props
}) => {
  const commonClassNames = clsx(
    styles.btn,
    styles[`btn-${size}`],
    {
      [styles[`btn-${variant}`]]: !transparent,
      [styles[`btn-${variant}-transparent`]]: transparent,
    },
    className,
  );

  const content = (
    <>
      {loading ? <span>Loading...</span> : <span>{children}</span>}
      {icon !== undefined && icon}
    </>
  );

  if (href !== undefined && externalHref === undefined) {
    // Internal link (Next.js Link)
    return (
      <Link href={href} legacyBehavior passHref>
        <a className={commonClassNames} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
          {content}
        </a>
      </Link>
    );
  }

  if (externalHref !== undefined && href === undefined) {
    // External link
    return (
      <a
        className={commonClassNames}
        href={externalHref}
        rel="noopener noreferrer"
        target="_blank"
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    );
  }

  // Button
  return (
    <button className={commonClassNames} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
};
