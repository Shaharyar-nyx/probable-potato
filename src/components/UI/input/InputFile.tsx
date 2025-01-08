"use client";

import React, { useRef, useState } from "react";

import { Button, IconRenderer } from "@/components";
import styles from "@/sections/careers/application-form/styles.module.scss";
import { InputFileProps } from "@/types";

export const InputFile: React.FC<InputFileProps> = ({
  clearErrors,
  error,
  formLoading = false,
  id,
  maxFileSize,
  name,
  register,
  setError,
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
        clearErrors(name);
      }
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
      <input
        type="file"
        {...register?.(name, {
          required: "File is required",
          validate: (file: File | null) =>
            file ? file.type === "application/pdf" || "Only PDF files are allowed" : "Please select a file",
        })}
        ref={inputRef}
        accept=".pdf"
        className="hidden"
        id={id}
        onChange={handleFileChange}
      />
      <Button
        className="border border-primary-800"
        disabled={formLoading}
        iconName="ArrowUpTrayIcon"
        type="button"
        variant="neutral"
        onClick={handleUploadClick}
      >
        {selectedFile ? selectedFile.name : "Upload your resume"}
      </Button>
      <div className="flex flex-row items-end gap-1">
        <IconRenderer className="h-[15px] w-[15px] text-[#02255B80]" iconName="ExclamationCircleIcon" />
        <p className={`paragraph-xs ${styles.uploadHelperText}`}>
          Format: .pdf, Max file size: {maxFileSize / 1024 / 1024}MB
        </p>
      </div>
      {error && (
        <p aria-live="assertive" className="mt-1 text-xs text-red-500">
          {error.message}
        </p>
      )}
    </div>
  );
};
