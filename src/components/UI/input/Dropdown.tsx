"use client";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";

import { IconRenderer } from "@/components";
import { DropdownPropsInput } from "@/types";

import "./styles.scss";

export const Dropdown: React.FC<DropdownPropsInput> = ({
  ariaDescribedBy,
  disabled = false,
  label,
  iconName,
  id,
  options,
  className,
  error,
  value,
  handleChange,
  onFocus,
  onBlur,
  onClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [hasFocus, setHasFocus] = useState(false); // Focus state for styling
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const handleFocus = (event: React.FocusEvent<HTMLButtonElement>) => {
    setHasFocus(true);
    if (onFocus) onFocus(event);
  };

  const handleBlur = (event: React.FocusEvent<HTMLButtonElement>) => {
    setHasFocus(false);
    if (onBlur) onBlur(event);
  };

  const handleSelect = (selectedOption: string) => {
    if (disabled) return;
    if (handleChange) {
      handleChange(selectedOption);
    }
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const toggleDropdown = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      setIsOpen((prev) => !prev);
    }
    if (onClick) {
      onClick(event);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (disabled) return;
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [disabled]);

  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const highlightedOption = listRef.current.children[highlightedIndex];
      if (highlightedOption !== undefined) {
        (highlightedOption as HTMLElement).scrollIntoView({
          block: "nearest",
        });
      }
    }
  }, [highlightedIndex]);

  return (
    <div ref={dropdownRef} className={clsx("dropdown-container", className)}>
      <button
        aria-controls={isOpen ? `${id}-listbox` : undefined}
        aria-describedby={ariaDescribedBy}
        aria-expanded={isOpen && !disabled}
        aria-haspopup="listbox"
        aria-labelledby={`${id}-label ${id}`}
        className={clsx("dropdown-input-container", {
          "input-error": error !== undefined,
          "dropdown-disabled": disabled,
          "dropdown-focused": hasFocus && !disabled && error === undefined,
          "dropdown-focused-error": hasFocus && !disabled && error !== undefined,
        })}
        disabled={disabled}
        id={id}
        type="button"
        onBlur={handleBlur}
        onClick={toggleDropdown}
        onFocus={handleFocus}
      >
        <div className="flex gap-3">
          {iconName !== undefined && (
            <IconRenderer
              className={clsx(
                "h-6 w-6",
                disabled
                  ? "text-primary-100"
                  : error !== undefined
                    ? "text-red-400"
                    : hasFocus
                      ? "text-primary-800"
                      : "text-neutral-400",
              )}
              iconName={iconName}
            />
          )}
          <span
            className={clsx(
              disabled
                ? "text-neutral-300"
                : error !== undefined
                  ? "text-red-400"
                  : value !== undefined
                    ? "text-primary-800"
                    : "text-neutral-300",
            )}
          >
            {value ?? label}
          </span>
        </div>
        <ChevronDownIcon
          className={clsx(
            "dropdown-input-arrow",
            isOpen ? "rotate-180" : "rotate-0",
            disabled
              ? "text-primary-100"
              : error !== undefined
                ? "text-red-400"
                : hasFocus
                  ? "text-primary-800"
                  : "text-neutral-400",
          )}
        />
      </button>

      {isOpen && !disabled && (
        <div className="dropdown-input-options-container" role="presentation">
          <ul ref={listRef} aria-labelledby={id} id={`${id}-listbox`} role="listbox" tabIndex={-1}>
            {options.map((option, index) => (
              <li
                key={index}
                aria-selected={value === option}
                className={clsx("dropdown-input-options-item", {
                  "dropdown-input-options-item-highlighted": highlightedIndex === index,
                })}
                id={`${id}-option-${index}`}
                role="option"
                tabIndex={-1}
                onClick={() => handleSelect(option)}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}

      {error !== undefined && (
        <p aria-live="assertive" className="input-text-error" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
};

Dropdown.displayName = "Dropdown";
