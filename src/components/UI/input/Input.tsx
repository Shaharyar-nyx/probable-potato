"use client";

import clsx from "clsx";
import React, { forwardRef, useState } from "react";

import { IconRenderer } from "@/components";
import { InputProps } from "@/types";

import "./styles.scss";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, id, iconName, parentClassName, disabled = false, ...props }, ref) => {
    const [hasFocus, setHasFocus] = useState(false); // State to track focus
    const errorId = error !== undefined ? `${id}-error` : undefined;

    return (
      <div>
        <div
          className={clsx("input-container", parentClassName, {
            "input-error": error !== undefined,
            "input-disabled": disabled,
            "input-focused": hasFocus && !disabled,
          })}
        >
          {iconName !== undefined && (
            <IconRenderer
              className={clsx("h-6 w-6", {
                "text-primary-800": hasFocus && !disabled && error !== undefined,
                "text-neutral-400": !hasFocus && error !== undefined && !disabled,
                "text-primary-100": disabled,
                "text-red-400": error,
              })}
              iconName={iconName}
            />
          )}
          <input
            ref={ref}
            aria-describedby={errorId}
            className="w-full bg-transparent outline-none"
            disabled={disabled}
            id={id}
            onBlur={() => setHasFocus(false)}
            onFocus={() => setHasFocus(true)}
            {...props}
          />
        </div>
        {error !== undefined && (
          <p aria-live="assertive" className="input-text-error" id={errorId}>
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
