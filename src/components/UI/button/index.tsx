"use client";

import clsx from "clsx";
import Link from "next/link";
import React, { AnchorHTMLAttributes, ButtonHTMLAttributes, useState, MouseEvent } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

import styles from "./styles.module.scss";
import { IconRenderer } from "@/components";
import { ButtonProps } from "@/types";

export const Button = ({
  children,
  loading = false,
  error,
  iconName,
  variant = "primary",
  size = "large",
  transparent = false,
  href,
  externalHref,
  className,
  onMouseEnter,
  onMouseLeave,
  ref,
  ...props
}: ButtonProps & { ref?: React.Ref<HTMLButtonElement | HTMLAnchorElement> }) => {
  const [hovered, setHovered] = useState(false);
  const isDisabled = "disabled" in props && props.disabled === true;

  const handleEnter = (e: MouseEvent<HTMLButtonElement> | MouseEvent<HTMLAnchorElement>) => {
    if (isDisabled) return;
    setHovered(true);
    if (onMouseEnter) onMouseEnter(e as never);
  };

  const handleLeave = (e: MouseEvent<HTMLButtonElement> | MouseEvent<HTMLAnchorElement>) => {
    if (isDisabled) return;
    setHovered(false);
    if (onMouseLeave) onMouseLeave(e as never);
  };

  const commonClassNames = clsx(
    styles.btn,
    styles[`btn-${size}`],
    {
      [styles[`btn-${variant}`]]: !transparent && error === undefined,
      [styles[`btn-${variant}-transparent`]]: transparent && error === undefined,
      "text-red-400": error !== undefined,
    },
    className,
  );

  const iconClassNames = clsx(styles[`icon-${size}`], {
    // Error styles
    "text-red-400": error !== undefined, // Apply red icon color if error is present

    // Default styles
    [styles[`icon-${variant}`]]: !transparent && !hovered && !isDisabled && error === undefined,
    [styles[`icon-${variant}-transparent`]]: transparent && !hovered && !isDisabled && error === undefined,

    // Hovered styles
    "text-primary-700": hovered && variant === "primary" && transparent && !isDisabled && error === undefined,
    "text-neutral-700": hovered && variant === "neutral" && transparent && !isDisabled && error === undefined,

    // Disabled styles
    "text-neutral-50": isDisabled && variant === "primary" && !transparent && error === undefined,
    "text-primary-100": isDisabled && variant === "primary" && transparent && error === undefined,
    "text-primary-800": isDisabled && variant === "neutral" && !transparent && error === undefined,
    "text-neutral-100": isDisabled && variant === "neutral" && transparent && error === undefined,
  });

  const content = (
    <>
      {loading ? (
        <span className="flex items-center gap-2">
          <ArrowPathIcon className="h-5 w-5 animate-spin" /> Submit
        </span>
      ) : (
        children !== undefined &&
        children !== null && <span className="overflow-hidden text-ellipsis whitespace-nowrap">{children}</span>
      )}
      {iconName !== undefined && <IconRenderer className={iconClassNames} iconName={iconName} />}
    </>
  );

  if (href !== undefined && externalHref === undefined) {
    // Internal link (Next.js Link)
    return (
      <Link
        href={href}
        className={commonClassNames}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        ref={ref as React.Ref<HTMLAnchorElement>}
      >
        {content}
      </Link>
    );
  }

  if (externalHref !== undefined && href === undefined) {
    // External link
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
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
      ref={ref as React.Ref<HTMLButtonElement>}
      className={commonClassNames}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
};

Button.displayName = "Button";
