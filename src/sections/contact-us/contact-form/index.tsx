"use client";

import React, { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";

import styles from "./styles.module.scss";
import { Button, Dropdown, Input, Textarea } from "@/components";
import formData from "@/data/contact-us/form.json";
import { ContactUsFormType } from "@/types";
import { useIsMobile } from "@/hooks";
import { formatBtnId } from "@/lib";
import { RECAPTCHA_SITE_KEY } from "@/lib/constants";
import { toast } from "react-toastify";

import { CYBERBAY_CMS_URL } from "@/lib/constants";

export const ContactForm: React.FC<any> = ({ title, headline, content }) => {
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [success, setSuccess] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ContactUsFormType>();

  const onSubmit = async (data: ContactUsFormType) => {
    if (!recaptchaToken) {
      toast.error("Please complete the reCAPTCHA verification");
      return;
    }

    setLoading(true);
    try {
      // Submit the form with the reCAPTCHA token
      const response = await fetch(`${CYBERBAY_CMS_URL}/api/forms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            body: {
              ...data,
              isSaveApollo: true,
              recaptchaToken,
            },
            name: "Contact Us Form",
            key: "contact_us_form"
          }
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
      
      reset();
      setSuccess(true);
      setError(null);
      // Reset reCAPTCHA
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
      toast.success("Thank you! We will get back to you shortly.");
    } catch (err) {
      console.error("Failed to submit contact form:", err);
      setError(err instanceof Error ? err : new Error("Failed to submit form"));
      toast.error("Failed to submit form");
    } finally {
      setLoading(false);
    }
  };

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
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
          
          {/* Add reCAPTCHA v2 widget */}
          <div className="mt-4">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={RECAPTCHA_SITE_KEY || "6LcKVOwqAAAAANvEExA84rDPvv74NqVnJeCI3hi8"}
              onChange={handleRecaptchaChange}
            />
          </div>
          
          <Button 
            id={formatBtnId('contact-form-submit')} 
            className="mt-3 self-start px-20 paragraph-sm w-full lg:w-fit lg:paragraph-md" 
            disabled={loading || !recaptchaToken} 
            loading={loading} 
            size="large" 
            type="submit"
          >
            Submit
          </Button>

          {success && (
            <p aria-live="polite" className="paragraph-sm text-green-500">
              Thank you for reaching out! We will get back to you shortly.
            </p>
          )}
          
          {error && (
            <p aria-live="polite" className="paragraph-sm text-red-500">
              {error.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};
