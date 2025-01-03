"use client";

import clsx from "clsx";
import Link from "next/link";
import React, { AnchorHTMLAttributes, ButtonHTMLAttributes, useState, MouseEvent } from "react";

import styles from "./styles.module.scss";
import { IconRenderer } from "@/components";
import { ButtonProps } from "@/types";

export const Button: React.FC<ButtonProps> = ({
  children,
  loading = false,
  iconName,
  variant = "primary",
  size = "large",
  transparent = false,
  href,
  externalHref,
  className,
  onMouseEnter,
  onMouseLeave,
  ...props
}) => {
  const [hovered, setHovered] = useState(false);
  const isDisabled = "disabled" in props && props.disabled === true;

  const handleEnter = (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (isDisabled) return;
    setHovered(true);
    if (onMouseEnter) onMouseEnter(e);
  };

  const handleLeave = (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (isDisabled) return;
    setHovered(false);
    if (onMouseLeave) onMouseLeave(e);
  };

  const commonClassNames = clsx(
    styles.btn,
    styles[`btn-${size}`],
    {
      [styles[`btn-${variant}`]]: !transparent,
      [styles[`btn-${variant}-transparent`]]: transparent,
    },
    className,
  );

  const iconClassNames = clsx("ml-2", styles[`icon-${size}`], {
    // Default styles
    [styles[`icon-${variant}`]]: !transparent && !hovered && !isDisabled,
    [styles[`icon-${variant}-transparent`]]: transparent && !hovered && !isDisabled,

    // Hovered styles
    "text-primary-700": hovered && variant === "primary" && transparent && !isDisabled,
    "text-neutral-700": hovered && variant === "neutral" && transparent && !isDisabled,

    // Disabled styles
    "text-neutral-50": isDisabled && variant === "primary" && !transparent,
    "text-primary-100": isDisabled && variant === "primary" && transparent,
    "text-primary-800": isDisabled && variant === "neutral" && !transparent,
    "text-neutral-100": isDisabled && variant === "neutral" && transparent,
  });

  const content = (
    <>
      {loading ? <span>Loading...</span> : <span>{children}</span>}
      {iconName !== undefined && <IconRenderer className={iconClassNames} iconName={iconName} />}
    </>
  );

  if (href !== undefined && externalHref === undefined) {
    // Internal link (Next.js Link)
    return (
      <Link href={href} legacyBehavior passHref onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
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
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    );
  }

  // Button
  return (
    <button
      className={commonClassNames}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
};
