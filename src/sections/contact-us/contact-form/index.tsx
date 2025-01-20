"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";

import styles from "./styles.module.scss";
import { Button, Dropdown, Input, Textarea } from "@/components";
import formData from "@/data/contact-us/form.json";
import { ContactUsFormType } from "@/types";
import { useSubmitContactUs } from "@/hooks/useSubmitContactUs";

export const ContactForm: React.FC = () => {
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
          <h2 className={`${styles.title} heading-2 font-bold`}>Get In Touch</h2>
          <p className={styles.description}>
            <span className="font-semibold">Looking to speak with a member of our team?</span>
            <br />
            Fill out the form with your contact details and a short message and we&apos;ll be in touch.
          </p>
        </div>

        <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="w-full">
              <Input
                className="bg-transparent outline-none"
                disabled={loading}
                iconName="UserIcon"
                placeholder="First Name *"
                {...register("first_name", { required: "First Name is required" })}
                error={errors.first_name?.message}
              />
            </div>
            <div className="w-full">
              <Input
                className="h-6 bg-transparent pl-2 outline-none"
                disabled={loading}
                placeholder="Last Name *"
                {...register("last_name", { required: "Last Name is required" })}
                error={errors.last_name?.message}
              />
            </div>
          </div>
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
            name="request_type"
            render={({ field }) => (
              <Dropdown
                disabled={loading}
                error={errors.request_type?.message}
                handleChange={field.onChange}
                iconName="BarsArrowUpIcon"
                id="request_type"
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
          <Button className="self-start px-20" disabled={loading} size="large" type="submit">
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
