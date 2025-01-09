"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";

import styles from "./styles.module.scss";
import { Button, Dropdown, Input, Textarea } from "@/components";
import formData from "@/data/contact-us/form.json";
import { ContactUsFormType } from "@/types";

export const ContactForm: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ContactUsFormType>();

  const onSubmit = (data: ContactUsFormType) => {
    setFormLoading(true);
    // Fetching logic
    console.log(data);
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
          <Input
            disabled={formLoading}
            iconName="UserIcon"
            placeholder="Full Name"
            {...register("name", { required: "Full Name is required" })}
            error={errors.name?.message}
          />
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
          <Controller
            control={control}
            name="requestType"
            render={({ field }) => (
              <Dropdown
                disabled={formLoading}
                error={errors.requestType?.message}
                handleChange={field.onChange}
                iconName="BarsArrowUpIcon"
                id="request-type"
                label="Request Type"
                options={formData.request_types.map((requestType) => requestType.label)}
                value={field.value}
              />
            )}
            rules={{ required: "Request type is required" }}
          />

          <Textarea
            disabled={formLoading}
            iconName="ChatBubbleOvalLeftEllipsisIcon"
            placeholder="Your Message (Optional)..."
            rows={4}
            {...register("message")}
          />
          <Button className="self-start px-20" disabled={formLoading} size="large" type="submit">
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
  );
};
