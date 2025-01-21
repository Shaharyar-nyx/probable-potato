"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";

import styles from "./styles.module.scss";
import { Button, Dropdown, Input, Textarea } from "@/components";
import formData from "@/data/contact-us/form.json";
import { ContactUsFormType } from "@/types";
import { apolloIoClient } from "@/lib";

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

  const onSubmit = async (data: ContactUsFormType) => {
    setFormLoading(true);
    const payload = {
      ...data,
      label_names: ["Contact Us Form"],
    };

    try {
      await apolloIoClient.createContact(payload);
    } catch (error) {
      console.error("Failed to create contact:", error);
    }
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
          <div className="flex flex-row gap-4">
            <div className="w-full">
              <Input
                className="bg-transparent outline-none"
                disabled={formLoading}
                iconName="UserIcon"
                placeholder="First Name"
                {...register("first_name", { required: "First Name is required" })}
                error={errors.first_name?.message}
              />
            </div>
            <div className="w-full">
              <Input
                className="h-6 bg-transparent pl-2 outline-none"
                disabled={formLoading}
                placeholder="Last Name"
                {...register("last_name", { required: "Last Name is required" })}
                error={errors.last_name?.message}
              />
            </div>
          </div>
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
            name="request_type"
            render={({ field }) => (
              <Dropdown
                disabled={formLoading}
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
            disabled={formLoading}
            iconName="ChatBubbleOvalLeftEllipsisIcon"
            placeholder="Your Message (Optional)..."
            rows={4}
            {...register("notes")}
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
