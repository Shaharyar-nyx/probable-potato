"use client";

import { ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";

import { DropdownPropsInput } from "@/types";

import "./styles.scss";
import { IconRenderer } from "@/components";

export const Dropdown: React.FC<DropdownPropsInput> = ({
  ariaDescribedBy,
  ariaInvalid,
  ariaRequired,
  disabled = false,
  label,
  iconName,
  id,
  options,
  className,
  error,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [innerValue, setInnerValue] = useState<string | undefined>(value);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setInnerValue(value);
  }, [value]);

  const handleSelect = (selectedOption: string) => {
    if (disabled) return;
    setInnerValue(selectedOption);
    if (onChange) {
      onChange(selectedOption);
    }
    setIsOpen(false);
    setHighlightedIndex(-1);
    buttonRef.current?.focus();
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

  const handleButtonKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setIsOpen(true);
      setHighlightedIndex((prev) => (prev + 1) % options.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setIsOpen(true);
      setHighlightedIndex((prev) => (prev - 1 + options.length) % options.length);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (isOpen && highlightedIndex >= 0) {
        handleSelect(options[highlightedIndex]);
      } else {
        setIsOpen((prev) => !prev);
      }
    } else if (event.key === "Escape") {
      event.preventDefault();
      setIsOpen(false);
      setHighlightedIndex(-1);
    }
  };

  const handleListItemKeyDown = (event: React.KeyboardEvent<HTMLLIElement>, option: string) => {
    if (disabled) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleSelect(option);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightedIndex((prev) => (prev + 1) % options.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightedIndex((prev) => (prev - 1 + options.length) % options.length);
    } else if (event.key === "Escape") {
      event.preventDefault();
      setIsOpen(false);
      buttonRef.current?.focus();
    }
  };

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
    <div
      ref={dropdownRef}
      aria-controls={isOpen ? `${id}-listbox` : undefined}
      aria-describedby={ariaDescribedBy}
      aria-expanded={isOpen && !disabled}
      aria-haspopup="listbox"
      aria-invalid={ariaInvalid}
      aria-labelledby={`${id}-button`}
      aria-required={ariaRequired}
      className={clsx("dropdown-input-container", className)}
      id={id}
      role="combobox"
    >
      {/* Dropdown Button */}
      {iconName !== undefined && <IconRenderer className="h-6 w-6 self-start text-primary-800" iconName={iconName} />}
      <button
        ref={buttonRef}
        aria-controls={`${id}-listbox`}
        aria-disabled={disabled}
        className={clsx("dropdown-input-button", { "input-error": error, "button-disabled": disabled })}
        disabled={disabled}
        id={`${id}-button`}
        type="button"
        onClick={() => {
          if (!disabled) {
            setIsOpen((prev) => !prev);
          }
        }}
        onKeyDown={handleButtonKeyDown}
      >
        <span
          className={clsx(
            disabled
              ? "text-neutral-300"
              : error !== undefined
                ? "text-red-400"
                : innerValue !== undefined
                  ? "text-neutral-200"
                  : "text-neutral-300",
          )}
        >
          {innerValue ?? label}
        </span>

        <ChevronDownIcon className={clsx("dropdown-input-arrow", isOpen ? "rotate-180" : "rotate-0")} />
      </button>

      {/* Dropdown Options */}
      {isOpen && !disabled && (
        <div className="dropdown-input-options-container" role="presentation">
          <ul ref={listRef} aria-labelledby={`${id}-button`} id={`${id}-listbox`} role="listbox" tabIndex={-1}>
            {options.map((option, index) => (
              <li
                key={index}
                aria-selected={innerValue === option}
                className={clsx("dropdown-input-options-item", {
                  "dropdown-input-options-item-highlighted": highlightedIndex === index,
                })}
                id={`${id}-option-${index}`}
                role="option"
                tabIndex={-1}
                onClick={() => handleSelect(option)}
                onKeyDown={(event) => handleListItemKeyDown(event, option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Error Message */}
      {error !== undefined && (
        <p aria-live="assertive" className="input-text-error" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
};

Dropdown.displayName = "Dropdown";
