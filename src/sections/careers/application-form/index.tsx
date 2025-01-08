"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import styles from "./styles.module.scss";
import { Button, IconRenderer, Input, Textarea } from "@/components";
import { ApplyFormType } from "@/types";

export const ApplicationForm: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    reset,
    watch,
    formState: { errors },
  } = useForm<ApplyFormType>();
  const inputRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE = 3 * 1024 * 1024; // 10MB in bytes

  const onSubmit = (data: ApplyFormType) => {
    setFormLoading(true);
    // Fetching logic
    console.log(data);
    setFormSubmitted(true);
    setFormLoading(false);
    reset();
  };

  const selectedFile = watch("resume"); // Watch for the selected file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setError("resume", {
          type: "manual",
          message: `File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB. Please upload a smaller file.`,
        });
        return;
      }
      clearErrors("resume");
      setValue("resume", file);
    } else {
      setValue("resume", null);
    }
  };

  const handleUploadClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  useEffect(() => {
    if (formSubmitted) {
      const timeout = setTimeout(() => setFormSubmitted(false), 5000);
      return () => clearTimeout(timeout);
    }
  }, [formSubmitted]);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.chatCard}>
          <div className={styles.chatHeader}>
            <div className={styles.iconWrapper}>
              <IconRenderer className={styles.icon} iconName="ChatBubbleOvalLeftEllipsisIcon" />
            </div>
            <h3 className="heading-7 font-bold">Chat to us</h3>
          </div>
          <p className={`paragraph-md ${styles.chatDescription}`}>
            Our team is here to help <br />
            <Link className={`paragraph-md ${styles.chatEmail}`} href="mailto:careers@cyberbay.tech">
              careers@cyberbay.tech
            </Link>
          </p>
        </div>

        <div className={styles.formContainer}>
          <h1 className={`heading-1 ${styles.formTitle}`}>
            Your next career move <br /> starts here.
          </h1>

          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <p className={`paragraph-lg ${styles.formSubtitle}`}>Let&apos;s grow together.</p>
            {/* Full Name Input */}
            <Input
              disabled={formLoading}
              iconName="UserIcon"
              placeholder="Full Name"
              {...register("name", { required: "Full Name is required" })}
              error={errors.name?.message}
            />
            {/* Email Input */}
            <Input
              disabled={formLoading}
              iconName="EnvelopeIcon"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Please enter a valid email address",
                },
              })}
              error={errors.email?.message}
            />
            <p className={`paragraph-lg ${styles.uploadLabel}`}>Let us know about your experience</p>
            {/* File Input */}
            <div>
              <input
                ref={inputRef}
                accept=".pdf"
                className="hidden"
                id="resume"
                type="file"
                onChange={handleFileChange}
              />
              <Button
                className="border border-primary-800"
                disabled={formLoading}
                iconName="ArrowUpTrayIcon"
                variant="neutral"
                onClick={handleUploadClick}
              >
                {selectedFile ? selectedFile.name : "Upload your resume"}
              </Button>
              <div className="flex flex-row items-end gap-1">
                <IconRenderer className="h-[15px] w-[15px] text-[#02255B80]" iconName="ExclamationCircleIcon" />
                <p className={`paragraph-xs ${styles.uploadHelperText}`}>
                  Format: .pdf, Max file size: {MAX_FILE_SIZE / 1024 / 1024}MB
                </p>
              </div>
              {errors.resume && (
                <p aria-live="assertive" className="mt-1 text-xs text-red-500">
                  {errors.resume.message}
                </p>
              )}
            </div>

            {/* Message Textarea */}
            <Textarea
              disabled={formLoading}
              iconName="ChatBubbleOvalLeftEllipsisIcon"
              placeholder="Your Message (Optional)..."
              rows={4}
              {...register("message")}
            />

            <Button className={styles.submitButton} type="submit">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};
