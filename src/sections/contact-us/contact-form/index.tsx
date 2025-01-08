"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

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

  const onSubmit = async (data: ContactUsFormType) => {
    setFormLoading(true);
    // Fetching logic
    console.log(data);
    setFormSubmitted(true);
    setFormLoading(false);
    reset();
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
        <div className="w-[40%]">
          <h2 className={`${styles.title} heading-2 font-bold`}>Get In Touch</h2>
          <p className={styles.description}>
            <span className="font-semibold">Looking to speak with a member of our team?</span>
            <br />
            Fill out the form with your contact details and a short message and we&apos;ll be in touch.
          </p>
        </div>

        <form className={styles.formContainer}>
          <Input disabled={formLoading} iconName="UserIcon" name="fullName" placeholder="Full Name" />
          <Input disabled={formLoading} iconName="EnvelopeIcon" name="email" placeholder="Email" />
          <Dropdown
            disabled={formLoading}
            iconName="BarsArrowUpIcon"
            id="request-type"
            label="Request Type"
            options={formData.request_types.map((requestType) => requestType.label)}
          />
          <Textarea
            disabled={formLoading}
            iconName="ChatBubbleOvalLeftEllipsisIcon"
            name="message"
            placeholder="Your Message (Optional)..."
            rows={4}
          />
          <Button className="!px-20" disabled={formLoading} size="large" type="submit">
            Submit
          </Button>
          {formSubmitted && (
            <p aria-live="polite" className="text-sm text-green-500">
              Information sent successfully!
            </p>
          )}
        </form>
      </div>
    </div>
  );
};
