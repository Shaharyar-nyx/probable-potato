"use client";

import clsx from "clsx";
import Link from "next/link";
import React, { AnchorHTMLAttributes, ButtonHTMLAttributes, useState, MouseEvent, forwardRef } from "react";

import styles from "./styles.module.scss";
import { IconRenderer } from "@/components";
import { ButtonProps } from "@/types";

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      children,
      loading = false,
      error = false,
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
    },
    ref,
  ) => {
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
        [styles[`btn-${variant}`]]: !transparent && !error,
        [styles[`btn-${variant}-transparent`]]: transparent && !error,
        "text-red-400": error,
      },
      className,
    );

    const iconClassNames = clsx(styles[`icon-${size}`], {
      // Error styles
      "text-red-400": error,

      // Default styles
      [styles[`icon-${variant}`]]: !transparent && !hovered && !isDisabled && !error,
      [styles[`icon-${variant}-transparent`]]: transparent && !hovered && !isDisabled && !error,

      // Hovered styles
      "text-primary-700": hovered && variant === "primary" && transparent && !isDisabled && !error,
      "text-neutral-700": hovered && variant === "neutral" && transparent && !isDisabled && !error,

      // Disabled styles
      "text-neutral-50": isDisabled && variant === "primary" && !transparent && !error,
      "text-primary-100": isDisabled && variant === "primary" && transparent && !error,
      "text-primary-800": isDisabled && variant === "neutral" && !transparent && !error,
      "text-neutral-100": isDisabled && variant === "neutral" && transparent && !error,
    });

    const content = (
      <>
        {loading ? (
          <span>Loading...</span>
        ) : (
          children && <span className="overflow-hidden text-ellipsis whitespace-nowrap">{children}</span> // Only render children if it's provided
        )}
        {iconName !== undefined && <IconRenderer className={iconClassNames} iconName={iconName} />}
      </>
    );

    if (href !== undefined && externalHref === undefined) {
      // Internal link (Next.js Link)
      return (
        <Link href={href} legacyBehavior passHref>
          <a
            className={commonClassNames}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
            ref={ref as React.Ref<HTMLAnchorElement>}
          >
            {content}
          </a>
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
  },
);

Button.displayName = "Button";
