"use client";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import _ from "lodash";
import { IconRenderer } from "@/components";
import { SelectBoxItemProps, SelectBoxProps } from "@/types";

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

  const handleSelect = (selectedOption: any) => {
    if (disabled || !handleChange) {
      return;
    }

    if (multiple) {
      handleSelectMultiple(selectedOption);
      return;
    }

    handleSelectSingle(selectedOption);
  };

  const handleSelectMultiple = (selectedOption: any) => {
    const newValue = selectedValues.includes(selectedOption)
      ? selectedValues.filter((v) => v !== selectedOption)
      : [...selectedValues, selectedOption];

    if (handleChange) handleChange(newValue);

    setHighlightedIndex(-1);
  };

  const handleSelectSingle = (selectedOption: any) => {
    if (handleChange) handleChange(selectedOption);
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

  const selectedLength = selectedValues.length || 0;

  const displayValue: string = multiple
    ? selectedLength > 0
      ? [label, selectedLength >= 1 ? ` <span style="color:#367de9;">(${selectedValues.length})</span>` : ""].join("")
      : [label, selectedValues && selectedValues.length > 0 ? ` <span style="color:#367de9;">(1)</span>` : ""].join("")
    : [label, selectedValues && selectedValues.length > 0 ? ` <span style="color:#367de9;">(1)</span>` : ""].join("");

  return (
    <div ref={dropdownRef} className={clsx("select-container", className)}>
      <button
        aria-controls={isOpen ? `${id}-listbox` : undefined}
        aria-describedby={ariaDescribedBy}
        aria-expanded={isOpen && !disabled}
        aria-haspopup="listbox"
        aria-labelledby={`${id}-label ${id}`}
        className={clsx("selectbox-input-container", {
          "input-error": error !== undefined,
          "select-disabled": disabled,
          "select-focused": hasFocus && !disabled && error === undefined,
          "select-focused-error": hasFocus && !disabled && error !== undefined,
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
                    ? "text-[#172937]"
                    : "text-[#172937]",
            )} line-clamp-1 pr-10 text-left`}
            dangerouslySetInnerHTML={{ __html: displayValue }}
          ></span>
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
        <div className="select-input-options-container mt-1 w-full py-[4px] pr-[4px]" role="presentation">
          <div className="scroll-container max-h-72 overflow-auto">
            <ul ref={listRef} aria-labelledby={id} id={`${id}-listbox`} role="listbox" tabIndex={-1}>
              {options.map((option: SelectBoxItemProps, index: number) => (
                <li
                  key={index}
                  aria-selected={selectedValues.includes(option)}
                  className={clsx("select-input-options-item", {
                    "select-input-options-item-highlighted": highlightedIndex === index,
                    "select-input-options-item-selected": selectedValues.includes(option),
                  })}
                  id={`${id}-option-${index}`}
                  role="option"
                  tabIndex={-1}
                  onClick={() => handleSelect(option)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                >
                  {option["label"]}
                </li>
              ))}
            </ul>
          </div>
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
