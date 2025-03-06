"use client";

import React from "react";
import { useForm } from "react-hook-form";

import styles from "./styles.module.scss";
import { Button, Input, Textarea, InputFile } from "@/components";
import { ApplyFormType } from "@/types";
import { useSubmitApplicationForm } from "@/hooks/useSubmitApplicationForm";
import Image from "next/image";
import { formatBtnId, STRAPI_ASSETS } from "@/lib";
import { useIsMobile } from "@/hooks";

export const ApplicationForm: React.FC<any> = ({
  title,
  content,
  headline,
  card: { title: cardTitle, content_md, icon },
}) => {
  const isMobile = useIsMobile();

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<ApplyFormType>();

  const { submit, loading, error, called } = useSubmitApplicationForm(reset);
  const shouldShowSuccessMessage = called && !loading && !error;

  const onSubmit = async (data: ApplyFormType) => {
    let fd = new FormData();

    const channel = "Careers Form";
    const formData: ApplyFormType = {
      email: data.email,
      message: data.message,
      name: data.name,
      file: data.file,
    };

    fd.append(
      "data",
      JSON.stringify({
        body: {
          ...formData,
          isSaveApollo: false,
          channel,
        },
        name: channel,
        key: channel?.toLowerCase()?.replace(/\s+/g, "_"),
      }),
    );

    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;

    if (!fileInput || !fileInput.files?.length) {
      console.error("No file input found or no file selected");
      return;
    }

    const file = fileInput.files[0];

    fd.append("files.file", file, file.name);

    submit(fd);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {!isMobile && <div className={styles.chatCard}>
          <div className={styles.chatHeader}>
            <div className={styles.iconWrapper}>
              <Image
                alt={icon.data.attributes.name}
                height={24}
                width={24}
                src={`${STRAPI_ASSETS}${icon.data.attributes.url}`}
              />
            </div>
            <h3 className="heading-7 font-bold">{cardTitle}</h3>
          </div>
          <div className={`paragraph-md ${styles.chatDescription}`} dangerouslySetInnerHTML={{ __html: content_md }} />
        </div>}

        <div className={styles.formContainer}>
          <h1 className={`${isMobile ? 'heading-7' : 'heading-1'} ${styles.formTitle} lg:w-[90%]`}>{title}</h1>

          {isMobile && <div className="mb-6">
            <div className={`${styles.chatHeader} items-start`}>
              <div className={styles.iconWrapper}>
                <Image
                  alt={icon.data.attributes.name}
                  height={18}
                  width={18}
                  src={`${STRAPI_ASSETS}${icon.data.attributes.url}`}
                />
              </div>
              <div>
                <h3 className="heading-8 font-bold">{cardTitle}</h3>
                <div className={`paragraph-md mt-0 ${styles.chatDescription}`} dangerouslySetInnerHTML={{ __html: content_md }} />
              </div>
            </div>
          </div>}

          <form id={formatBtnId('application-form')} className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <p className={`paragraph-lg ${styles.formSubtitle}`}>{content}</p>

            <Input
              disabled={loading}
              iconName="UserIcon"
              placeholder="Full Name *"
              {...register("name", { required: "Full Name is required" })}
              error={errors.name?.message}
            />

            {/* Email Input */}
            <Input
              disabled={loading}
              error={errors.email?.message}
              iconName="EnvelopeIcon"
              placeholder="Email *"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Please enter a valid email address",
                },
              })}
            />
            <p className={`paragraph-lg ${styles.uploadLabel}`}>{headline}</p>
            {/* File Input */}
            <InputFile
              clearErrors={clearErrors}
              error={errors.file?.message}
              loading={loading}
              id="file"
              maxFileSize={MAX_FILE_SIZE}
              name="file"
              register={register}
              setError={setError}
              setValue={setValue}
            />

            {/* Message Textarea */}
            <Textarea
              disabled={loading}
              iconName="ChatBubbleOvalLeftEllipsisIcon"
              placeholder="Tell us what’s excited about the future of cybersecurity..."
              rows={4}
              {...register("message")}
            />

            <Button id={formatBtnId('application-form-submit')} className={`${styles.submitButton} ${isMobile ? 'w-full' : 'w-fit'}`} disabled={loading} loading={loading} type="submit">
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
