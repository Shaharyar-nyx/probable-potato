"use client";

import clsx from "clsx";
import React, { useState } from "react";

import { IconRenderer } from "@/components";
import { InputProps } from "@/types";

import "./styles.scss";

export const Input = ({
  error,
  id,
  iconName,
  svgIcon,
  parentClassName,
  disabled = false,
  onFocus,
  onBlur,
  ref,
  ...props
}: InputProps & { ref?: React.Ref<HTMLInputElement> }) => {
  const [hasFocus, setHasFocus] = useState(false);
  const errorId = error !== undefined ? `${id}-error` : undefined;

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setHasFocus(true);
    if (onFocus) {
      onFocus(event);
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setHasFocus(false);
    if (onBlur) {
      onBlur(event);
    }
  };

  return (
    <div>
      <div
        className={clsx("input-container items-center", parentClassName, {
          "input-error": error !== undefined,
          "input-disabled": disabled,
          "input-focused": hasFocus && !disabled && error === undefined,
          "input-focused-error": hasFocus && !disabled && error !== undefined,
        })}
      >
        {iconName !== undefined && (
          <IconRenderer
            className={clsx("h-6 w-6", {
              "text-red-400": error !== undefined,
              "text-primary-800":
                (hasFocus && !disabled && error === undefined) || (!hasFocus && error === undefined && !disabled),
              "text-primary-100": disabled,
            })}
            iconName={iconName}
          />
        )}
        {svgIcon !== undefined && (
          <span
            className={clsx(
              "mt-[1px] flex w-6 items-center justify-center",
              disabled
                ? "text-primary-100"
                : error !== undefined
                  ? "text-red-400"
                  : hasFocus
                    ? "text-primary-800"
                    : "text-primary-800",
            )}
          >
            {svgIcon}
          </span>
        )}
        <input
          ref={ref}
          aria-describedby={errorId}
          className="!w-full bg-transparent outline-none"
          disabled={disabled}
          id={id}
          onBlur={handleBlur}
          onFocus={handleFocus}
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
};

Input.displayName = "Input";
