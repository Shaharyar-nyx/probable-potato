"use client";

import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

import styles from "./styles.module.scss";
import { Button, IconRenderer, Input, Textarea, InputFile } from "@/components";
import { ApplyFormType } from "@/types";
import { useSubmitApplicationForm } from "@/hooks/useSubmitApplicationForm";

export const ApplicationForm: React.FC = () => {
  const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB in bytes

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<ApplyFormType>();

  const { submit, loading, error, called } = useSubmitApplicationForm(reset);
  const shouldShowSuccessMessage = called && !loading && !error;

  const onSubmit = async (data: ApplyFormType) => {
    submit(data);
  };

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
           
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="w-full">
                <Input
                  className="bg-transparent outline-none"
                  disabled={loading}
                  iconName="UserIcon"
                  placeholder="First Name"
                  {...register("first_name", { required: "First Name is required" })}
                  error={errors.first_name?.message}
                />
              </div>
              <div className="w-full">
                <Input
                  className="h-6 bg-transparent pl-2 outline-none"
                  disabled={loading}
                  placeholder="Last Name"
                  {...register("last_name", { required: "Last Name is required" })}
                  error={errors.last_name?.message}
                />
              </div>
            </div>
            {/* Email Input */}
            <Input
              disabled={loading}
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
              error={errors.resume?.message}
              loading={loading}
              id="resume"
              maxFileSize={MAX_FILE_SIZE}
              name="resume"
              register={register}
              setError={setError}
            />

            {/* Message Textarea */}
            <Textarea
              disabled={loading}
              iconName="ChatBubbleOvalLeftEllipsisIcon"
              placeholder="Your Message (Optional)..."
              rows={4}
              {...register("message")}
            />

            <Button className={styles.submitButton} disabled={loading} type="submit">
              Submit
            </Button>

            {shouldShowSuccessMessage && (
              <p aria-live="polite" className="paragraph-sm text-green-500">
                Thank you for reaching out! We will get back to you shortly.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};
