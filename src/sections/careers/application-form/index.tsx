"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import styles from "./styles.module.scss";
import { Button, IconRenderer, Input, Textarea, InputFile } from "@/components";
import { ApplyFormType } from "@/types";

export const ApplicationForm: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB in bytes

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<ApplyFormType>();

  const onSubmit = (data: ApplyFormType) => {
    setFormLoading(true);
    console.log("Form submitted:", data);
    // Simulate fetching logic
    setTimeout(() => {
      setFormSubmitted(true);
      setFormLoading(false);
      reset();
    }, 1000);
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
              error={errors.name?.message}
              iconName="UserIcon"
              placeholder="Full Name"
              {...register("name", { required: "Full Name is required" })}
            />
            {/* Email Input */}
            <Input
              disabled={formLoading}
              error={errors.email?.message}
              iconName="EnvelopeIcon"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Please enter a valid email address",
                },
              })}
            />
            <p className={`paragraph-lg ${styles.uploadLabel}`}>Let us know about your experience</p>
            {/* File Input */}
            <InputFile
              clearErrors={clearErrors}
              error={errors.resume}
              formLoading={formLoading}
              id="resume"
              maxFileSize={MAX_FILE_SIZE}
              name="resume"
              register={register}
              setError={setError}
            />

            {/* Message Textarea */}
            <Textarea
              disabled={formLoading}
              iconName="ChatBubbleOvalLeftEllipsisIcon"
              placeholder="Your Message (Optional)..."
              rows={4}
              {...register("message")}
            />

            <Button className={styles.submitButton} disabled={formLoading} type="submit">
              Submit
            </Button>

            {formSubmitted && (
              <p aria-live="polite" className="paragraph-sm text-green-500">
                Information sent successfully!
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};
