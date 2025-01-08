import clsx from "clsx";
import React, { forwardRef } from "react";

import { IconRenderer } from "@/components";
import { InputProps } from "@/types";

import "./styles.scss";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, id, iconName, parentClassName, disabled, ...props }, ref) => {
    const errorId = error !== undefined ? `${id}-error` : undefined;

    return (
      <div
        className={clsx("input-container", parentClassName, {
          "input-error": error !== undefined,
        })}
      >
        {iconName !== undefined && <IconRenderer className="h-6 w-6" iconName={iconName} />}
        <input
          ref={ref}
          aria-describedby={errorId}
          className="w-full bg-transparent outline-none"
          disabled={disabled}
          id={id}
          {...props}
        />
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
