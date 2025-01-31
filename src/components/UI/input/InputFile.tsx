"use client";
import clsx from "clsx";
import React, { ButtonHTMLAttributes, useRef, useState } from "react";
import { Button, IconRenderer } from "@/components";
import styles from "@/sections/careers/application-form/styles.module.scss";
import { InputFileProps } from "@/types";

export const InputFile: React.FC<InputFileProps> = ({
  clearErrors,
  error,
  loading = false,
  id,
  maxFileSize,
  name,
  register,
  setValue,
  setError,
  className,
  children = "Upload your file",
  ...buttonProps
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const validType = "application/pdf";

      if (setError !== undefined) {
        if (file.type !== validType) {
          setError(name, { type: "manual", message: "Only PDF files are allowed" });
          return;
        }

        if (file.size > maxFileSize) {
          setError(name, { type: "manual", message: `File size must be less than ${maxFileSize / 1024 / 1024}MB` });
          return;
        }
      }

      if (clearErrors !== undefined) {
        clearErrors?.(name);
      }

      setValue?.(name, file);
      setSelectedFile(file);
    } else {
      if (setError !== undefined) {
        setError(name, { type: "manual", message: "Please select a file" });
      }
    }
  };

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  return (
    <div>
      <input type="file" ref={inputRef} accept=".pdf" className="hidden" id={id} onChange={handleFileChange} />
      <Button
        className={clsx("max-w-[250px] border", error ? "border-red-400" : "border-primary-800")}
        disabled={loading}
        type="button"
        variant="neutral"
        onClick={handleUploadClick}
        {...(buttonProps as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {selectedFile ? selectedFile.name : children}
      </Button>
      <div className="flex flex-row items-end gap-1">
        <IconRenderer className="h-[15px] w-[15px] text-primary-800" iconName="ExclamationCircleIcon" />
        <p className={`paragraph-xs ${styles.uploadHelperText}`}>
          Format: .pdf, Max file size: {maxFileSize / 1024 / 1024}MB
        </p>
      </div>
      {error && (
        <p aria-live="assertive" className="mt-1 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};

export default InputFile;
