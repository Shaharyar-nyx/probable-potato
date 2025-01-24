"use client";

import clsx from "clsx";
import React, { useState } from "react";

import "./styles.scss";
import { IconRenderer } from "@/components";
import { TextareaProps } from "@/types";

export const Textarea = ({
  error,
  id,
  iconName,
  parentClassName,
  disabled = false,
  onFocus,
  onBlur,
  ref,
  ...props
}: TextareaProps & { ref?: React.Ref<HTMLTextAreaElement> }) => {
  const [hasFocus, setHasFocus] = useState(false); // State to track focus
  const errorId = error !== undefined ? `${id}-error` : undefined;

  const handleFocus = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    setHasFocus(true);
    if (onFocus) {
      onFocus(event);
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    setHasFocus(false);
    if (onBlur) {
      onBlur(event);
    }
  };

  return (
    <div
      className={clsx("input-container items-start", parentClassName, {
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
      <textarea
        ref={ref}
        aria-describedby={errorId}
        className="w-full bg-transparent outline-none"
        disabled={disabled}
        id={id}
        onBlur={handleBlur}
        onFocus={handleFocus}
        {...props}
      />
      {error !== undefined && (
        <p aria-live="assertive" className="input-text-error" id={errorId}>
          {error}
        </p>
      )}
    </div>
  );
};

Textarea.displayName = "Textarea";
