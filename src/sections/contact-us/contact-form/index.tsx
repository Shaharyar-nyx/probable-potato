"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";

import styles from "./styles.module.scss";
import { Button, Dropdown, Input, Textarea } from "@/components";
import formData from "@/data/contact-us/form.json";
import { ContactUsFormType } from "@/types";
import { useSubmitContactUs } from "@/hooks/useSubmitContactUs";
import { useIsMobile } from "@/hooks";
import { formatBtnId } from "@/lib";

export const ContactForm: React.FC<any> = ({ title, headline, content }) => {
  const isMobile = useIsMobile();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ContactUsFormType>();

  const { submit, loading, error, called } = useSubmitContactUs(reset);
  const shouldShowSuccessMessage = called && !loading && !error;

  const onSubmit = async (data: ContactUsFormType) => {
    submit(data);
  };

  return (
    <div className={styles.container}>
      <div className={styles.gridContainer}>
        <div className="w-full lg:w-[40%]">
          <h2 className={`${styles.title} ${isMobile ? "heading-7" : "heading-2"} font-bold`}>{title}</h2>
          <p className={`${styles.description} paragraph-md`}>
            <span className="font-semibold">{headline}</span>
            <br />
            {content}
          </p>
        </div>

        <form id={formatBtnId('contact-form')} className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
          <Input
            disabled={loading}
            iconName="UserIcon"
            placeholder="Full Name *"
            {...register("name", { required: "Full Name is required" })}
            error={errors.name?.message}
          />

          <Input
            disabled={loading}
            iconName="EnvelopeIcon"
            placeholder="Email *"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Please enter a valid email address",
              },
            })}
            error={errors.email?.message}
          />
          <Controller
            control={control}
            name="request"
            render={({ field }) => (
              <Dropdown
                disabled={loading}
                error={errors.request?.message}
                handleChange={field.onChange}
                iconName="BarsArrowUpIcon"
                id="request"
                label="Request Type"
                options={formData.request_types.map((requestType) => requestType.label)}
                value={field.value}
              />
            )}
            rules={{ required: "Request type is required" }}
          />

          <Textarea
            disabled={loading}
            iconName="ChatBubbleOvalLeftEllipsisIcon"
            placeholder="Your Message (Optional)..."
            rows={4}
            {...register("message")}
          />
          <Button id={formatBtnId('contact-form-submit')} className="mt-3 self-start px-20 paragraph-sm w-full lg:w-fit lg:paragraph-md" disabled={loading} loading={loading} size="large" type="submit">
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
  );
};
