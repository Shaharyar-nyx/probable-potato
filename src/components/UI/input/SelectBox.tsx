"use client";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";

import { IconRenderer } from "@/components";
import { SelectBoxProps } from "@/types";

import "./styles.scss";

export const SelectBox: React.FC<SelectBoxProps> = ({
  ariaDescribedBy,
  disabled = false,
  label,
  iconName,
  svgIcon,
  id,
  options,
  className,
  error,
  value,
  multiple = false,
  handleChange,
  onFocus,
  onBlur,
  onClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [hasFocus, setHasFocus] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selectedValues = Array.isArray(value) ? value : value ? [value] : [];

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
      if (multiple) {
        const newValue = selectedValues.includes(selectedOption)
          ? selectedValues.filter((v) => v !== selectedOption)
          : [...selectedValues, selectedOption];
        handleChange(newValue);
      } else {
        handleChange(selectedOption);
        setIsOpen(false);
      }
    }
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

  const displayValue = multiple ? (selectedValues.length > 0 ? selectedValues.join(", ") : label) : value || label;

  return (
    <div ref={dropdownRef} className={clsx("dropdown-container", className)}>
      <button
        aria-controls={isOpen ? `${id}-listbox` : undefined}
        aria-describedby={ariaDescribedBy}
        aria-expanded={isOpen && !disabled}
        aria-haspopup="listbox"
        aria-labelledby={`${id}-label ${id}`}
        className={clsx("selectbox-input-container", {
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
                      : "text-primary-800",
              )}
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
          <span
            className={`${clsx(
              disabled
                ? "text-neutral-300"
                : error !== undefined
                  ? "text-red-400"
                  : value !== undefined
                    ? "text-primary-800"
                    : "text-neutral-300",
            )} pr-10 text-left`}
          >
            {displayValue}
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
                  : "text-primary-400",
          )}
        />
      </button>

      {isOpen && !disabled && (
        <div className="dropdown-input-options-container" role="presentation">
          <ul ref={listRef} aria-labelledby={id} id={`${id}-listbox`} role="listbox" tabIndex={-1}>
            {options.map((option, index) => (
              <li
                key={index}
                aria-selected={selectedValues.includes(option)}
                className={clsx("dropdown-input-options-item", {
                  "dropdown-input-options-item-highlighted": highlightedIndex === index,
                  "dropdown-input-options-item-selected": selectedValues.includes(option),
                })}
                id={`${id}-option-${index}`}
                role="option"
                tabIndex={-1}
                onClick={() => handleSelect(option)}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                {multiple && (
                  <div className={clsx("checkbox", selectedValues.includes(option) && "checkbox-checked")}>
                    {selectedValues.includes(option) && <IconRenderer iconName="CheckIcon" className="h-4 w-4" />}
                  </div>
                )}
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

SelectBox.displayName = "SelectBox";
