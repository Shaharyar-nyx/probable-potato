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
  setError,
  className,
  children = "Upload your resume",
  ...buttonProps
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { ref: registerRef, onChange: registerOnChange, ...registerProps } = register?.(name, {
    required: "File is required",
    validate: {
      fileType: (value: FileList | null) => {
        if (!value?.length) return "File is required";
        const file = value[0];
        return file.type === "application/pdf" || "Only PDF files are allowed";
      },
      fileSize: (value: FileList | null) => {
        if (!value?.length) return "File is required";
        const file = value[0];
        return file.size <= maxFileSize || `File size must be less than ${maxFileSize / 1024 / 1024}MB`;
      },
    },
  }) || {};

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (!file) {
      setSelectedFile(null);
      if (registerOnChange) {
        registerOnChange(event);
      }
      return;
    }

    const validType = "application/pdf";
    if (file.type !== validType) {
      setError?.(name, { type: "manual", message: "Only PDF files are allowed" });
      setSelectedFile(null);
      event.target.value = '';
      return;
    }

    if (file.size > maxFileSize) {
      setError?.(name, { 
        type: "manual", 
        message: `File size must be less than ${maxFileSize / 1024 / 1024}MB` 
      });
      setSelectedFile(null);
      event.target.value = '';
      return;
    }

    clearErrors?.(name);
    setSelectedFile(file);
    if (registerOnChange) {
      registerOnChange(event);
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".pdf"
        className="hidden"
        id={id}
        name={name}
        ref={(e) => {
          fileInputRef.current = e;
          if (registerRef) {
            registerRef(e);
          }
        }}
        onChange={handleFileChange}
      />
      <Button
        className={clsx("max-w-[250px] border", error ? "border-red-400" : "border-primary-800")}
        disabled={loading}
        error={error}
        iconName="ArrowUpTrayIcon"
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
