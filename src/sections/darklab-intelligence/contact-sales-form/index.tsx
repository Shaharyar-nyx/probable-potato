"use client";

import { useForm } from "react-hook-form";
import React, { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

import styles from "./styles.module.scss";
import { Button, IconRenderer, Input, Textarea } from "@/components";
import { ContactSalesFormType } from "@/types";
import { useSubmitContactSales } from "@/hooks/useSubmitContactSales";
import { useIsMobile } from "@/hooks";
import { formatBtnId } from "@/lib";
import { RECAPTCHA_SITE_KEY } from "@/lib/constants";
import { toast } from "react-toastify";

interface ContactFormData {
  firstName: string;
  lastName: string;
  phone: string;
  jobTitle: string;
  companyName: string;
  businessEmail: string;
  headTitle: string;
  ownerOption: string;
  message: string;
  consent: boolean;
}

// Custom Select component
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  iconName?: string;
  placeholder: string;
  options: { value: string; label: string }[];
  error?: string;
}

const Select: React.FC<SelectProps> = ({ 
  iconName, 
  placeholder, 
  options, 
  error,
  className = "",
  ...props 
}) => {
  return (
    <div className="relative w-full">
      {iconName && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <IconRenderer className="h-5 w-5" iconName={iconName} />
        </div>
      )}
      <select
        className={`
          w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500
          ${iconName ? 'pl-10' : 'pl-3'}
          ${error ? 'border-red-500' : 'border-gray-300'}
          ${props.disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
          ${className}
        `}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
};

export const ContactSalesForm: React.FC<{ id: string; onSuccess?: () => void }> = ({ id, onSuccess }) => {
  const isMobile = useIsMobile();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ContactFormData>();

  const { submit, loading, error, called } = useSubmitContactSales(reset);
  const shouldShowSuccessMessage = called && !loading && !error;
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const onSubmit = async (data: ContactFormData) => {
    if (!recaptchaToken) {
      toast.error("Please complete the reCAPTCHA verification");
      return;
    }
    
    submit({...data, recaptchaToken});
    
    // Reset reCAPTCHA after successful submission
    if (shouldShowSuccessMessage) {
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
    }
  };

  // Call onSuccess callback if submission was successful and onSuccess is provided
  React.useEffect(() => {
    if (shouldShowSuccessMessage && onSuccess) {
      // Add a small delay to allow the user to see the success message
      const timer = setTimeout(() => {
        onSuccess();
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [shouldShowSuccessMessage, onSuccess]);

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const ownerOptions = [
    { value: "owner", label: "Owner" },
    { value: "co-owner", label: "Co-Owner" },
    { value: "not-owner", label: "Not Owner" }
  ];

  const headTitleOptions = [
    { value: "headteacher", label: "Headteacher" },
    { value: "counsel", label: "Counsel" },
    { value: "director", label: "Director" },
    { value: "manager", label: "Manager" }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.gridContainer}>
        <div className="w-full lg:w-1/2">
          <h1 className={`${styles.title} ${isMobile ? "heading-7" : "heading-1"} font-bold`}>Contact Us</h1>
          <div className="flex flex-col gap-6 lg:gap-10 mt-6">
            {[
              {
                title: "Tailored Solutions",
                text: "Work with our experts to craft cybersecurity plans specific to your business needs.",
                icon: "SquaresPlusIcon",
              },
              {
                title: "Transparent Pricing",
                text: "Get clarity on costs and maximize ROI with flexible, scalable packages.",
                icon: "CurrencyDollarIcon",
              },
              {
                title: "Expert Guidance",
                text: "Rely on our dedicated team for ongoing support and security optimization.",
                icon: "UserCircleIcon",
              },
            ].map((feature, id) => (
              <div key={id} className="flex flex-row items-start gap-3 lg:gap-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-md bg-primary-500 p-1">
                    <IconRenderer className="h-[24px] w-[24px] text-neutral-50" iconName={feature.icon} />
                  </div>
                </div>
                <div>
                  <p className="paragraph-lg font-semibold text-primary-800">{feature.title}</p>
                  <p className="paragraph-sm text-primary-800">{feature.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <form id={formatBtnId(`${id}-form`)} className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
          {/* Two column layout for First Name and Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              disabled={loading}
              iconName="UserIcon"
              placeholder="First Name *"
              {...register("firstName", { required: "First Name is required" })}
              error={errors.firstName?.message}
            />

            <Input
              disabled={loading}
              iconName="UserIcon"
              placeholder="Last Name *"
              {...register("lastName", { required: "Last Name is required" })}
              error={errors.lastName?.message}
            />
          </div>

          <Input
            disabled={loading}
            iconName="PhoneIcon"
            placeholder="Phone *"
            type="tel"
            {...register("phone", {
              required: "Phone is required",
              pattern: {
                value: /^[+]?[\d\s\-()]+$/,
                message: "Please enter a valid phone number",
              },
            })}
            error={errors.phone?.message}
          />

          <Input
            disabled={loading}
            iconName="BriefcaseIcon"
            placeholder="Job Title *"
            {...register("jobTitle", { required: "Job Title is required" })}
            error={errors.jobTitle?.message}
          />

          {/* Two column layout for Company Name and Business Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              disabled={loading}
              iconName="BuildingOffice2Icon"
              placeholder="Company Name *"
              {...register("companyName", {
                required: "Company Name is required",
              })}
              error={errors.companyName?.message}
            />

            <Input
              disabled={loading}
              iconName="EnvelopeIcon"
              placeholder="Business Email *"
              type="email"
              {...register("businessEmail", {
                required: "Business Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Please enter a valid email address",
                },
              })}
              error={errors.businessEmail?.message}
            />
          </div>

          {/* Two column layout for HeadTitle and Owner Option */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              disabled={loading}
              iconName="UserCircleIcon"
              placeholder="HeadTitle by *"
              options={headTitleOptions}
              {...register("headTitle", { required: "HeadTitle is required" })}
              error={errors.headTitle?.message}
            />

            <Select
              disabled={loading}
              iconName="ShieldCheckIcon"
              placeholder="Owner option *"
              options={ownerOptions}
              {...register("ownerOption", { required: "Owner option is required" })}
              error={errors.ownerOption?.message}
            />
          </div>

          <Textarea
            disabled={loading}
            iconName="ChatBubbleOvalLeftEllipsisIcon"
            placeholder="Please share any experience or information *"
            rows={4}
            {...register("message", { required: "Please share your experience or information" })}
            error={errors.message?.message}
          />

          {/* Consent Checkbox */}
          <div className="flex items-start gap-3 mt-4">
            <input
              type="checkbox"
              id="consent"
              {...register("consent", { 
                required: "You must agree to the terms to continue" 
              })}
              className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="consent" className="paragraph-sm text-primary-800">
              I confirm that Digital Policy may communicate with me about this form, position, wireless content, industry insights, and related resources.
            </label>
          </div>
          {errors.consent && (
            <p className="paragraph-xs text-red-500 mt-1">{errors.consent.message}</p>
          )}
          
          {/* Add reCAPTCHA v2 widget */}
          <div className="mt-4">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={RECAPTCHA_SITE_KEY || "6LcKVOwqAAAAANvEExA84rDPvv74NqVnJeCI3hi8"}
              onChange={handleRecaptchaChange}
            />
          </div>

          <Button 
            id={formatBtnId(`${id}-submit`)} 
            className="self-start px-20 !mt-6 paragraph-sm w-full lg:w-fit lg:paragraph-md" 
            disabled={loading || !recaptchaToken || !watch("consent")} 
            loading={loading} 
            size="large" 
            type="submit"
          >
            Submit
          </Button>

          {shouldShowSuccessMessage && (
            <p aria-live="polite" className="paragraph-sm text-green-500 mt-4">
              Thank you for reaching out! We will get back to you shortly.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};