"use client";

import { ChevronDownIcon } from "@heroicons/react/20/solid";
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
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [innerValue, setInnerValue] = useState<string | undefined>(value);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
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
  };

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen((prev) => !prev);
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
          "input-error": error,
          "dropdown-disabled": disabled,
        })}
        disabled={disabled}
        id={id}
        type="button"
        onClick={toggleDropdown}
      >
        <div className="flex gap-3">
          {iconName !== undefined && <IconRenderer className="h-6 w-6 text-primary-800" iconName={iconName} />}
          <span
            className={clsx(
              disabled
                ? "text-neutral-300"
                : error !== undefined
                  ? "text-red-400"
                  : innerValue !== undefined
                    ? "text-primary-800"
                    : "text-neutral-300",
            )}
          >
            {innerValue ?? label}
          </span>
        </div>
        <ChevronDownIcon
          className={clsx(
            "dropdown-input-arrow",
            disabled ? "text-primary-100" : isOpen ? "rotate-180 text-primary-800" : "text-neutral-400",
          )}
        />
      </button>

      {isOpen && !disabled && (
        <div className="dropdown-input-options-container" role="presentation">
          <ul ref={listRef} aria-labelledby={id} id={`${id}-listbox`} role="listbox" tabIndex={-1}>
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
