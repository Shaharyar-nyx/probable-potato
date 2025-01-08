"use client";

import { ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";

import { IconRenderer } from "@/components";
import { DropdownPropsInput } from "@/types";

import "./styles.scss";

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

  const handleButtonClick = () => {
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
      className={clsx("dropdown-input-container", className, {
        "input-error": error,
        "dropdown-disabled": disabled,
      })}
      id={id}
      role="combobox"
    >
      <div className="dropdown-inner-container">
        {iconName !== undefined && <IconRenderer className="h-6 w-6 text-primary-800" iconName={iconName} />}

        <button
          aria-controls={`${id}-listbox`}
          aria-disabled={disabled}
          className="dropdown-input-button"
          disabled={disabled}
          id={`${id}-button`}
          type="button"
          onClick={handleButtonClick}
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
      </div>

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
