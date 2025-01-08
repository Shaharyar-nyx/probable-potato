import clsx from "clsx";
import React, { forwardRef } from "react";

import "./styles.scss";
import { IconRenderer } from "@/components";
import { TextareaProps } from "@/types";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, id, iconName, parentClassName, disabled, ...props }, ref) => {
    const errorId = error !== undefined ? `${id}-error` : undefined;

    return (
      <div
        className={clsx("input-container", parentClassName, {
          "input-error": error !== undefined,
        })}
      >
        {iconName !== undefined && <IconRenderer className="h-6 w-6" iconName={iconName} />}
        <textarea
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

Textarea.displayName = "Textarea";
