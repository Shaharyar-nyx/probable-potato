"use client";

import React, { useRef, useState, Suspense } from "react";
import { useForm, Controller } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import { useSearchParams } from "next/navigation";

import styles from "./styles.module.scss";
import { Button, Dropdown, Input, Textarea } from "@/components";
import formData from "@/data/contact-us/form.json";
import { ContactUsFormType } from "@/types";
import { useIsMobile } from "@/hooks";
import { formatBtnId } from "@/lib";
import { RECAPTCHA_SITE_KEY } from "@/lib/constants";
import { toast } from "react-toastify";

import { useSubmitContactUs } from "@/hooks/useSubmitContactUs";

// Valid sources and their corresponding labels
const sourceLabels: Record<string, string> = {
  "high-critical-bugs": "High Risk Bugs Found",
  "uncovered-domains": "Assets Outside Scope",
  "leaked-credentials": "Leaked Credentials Found",
  "shadow-it": "Shadow IT Detected",
};

const sourceContent: Record<
  string,
  {
    title: string;
    lines: Array<{
      title: string;
      content: string;
    }>;
  }
> = {
  "high-critical-bugs": {
    title: "Book Your Premium Critical Bug Review With A Cyberbay Expert Today!",
    lines: [
      {
        title: "Live Vulnerability. Immediate Risk.",
        content: "A critical flaw has been reported in your environment—verified by top-performing ethical hackers.",
      },
      {
        title: "Risk Is Real-Time",
        content: "Critical bugs demand rapid review to prevent exploit and reputational fallout.",
      },
      {
        title: "Secure Fast. With Context.",
        content: "Book a Premium Bug Review to understand severity, exploitability, and remediation priorities.",
      },
    ],
  },
  "uncovered-domains": {
    title: "Book Your Premium Shadow Assets Review With A Cyberbay Expert Today or Upgrade Today",
    lines: [
      {
        title: "Shadow Assets, Mapped",
        content: "We surfaced domains or infrastructure not included in your known inventory.",
      },
      {
        title: "Gaps in Visibility",
        content: "Untracked assets = unmonitored risk - prime targets for automated attacks.",
      },
      {
        title: "Book a Digital Footprint Review",
        content: "We’ll walk you through what we found, how it was exposed, and how to bring it under control.",
      },
    ],
  },
  "leaked-credentials": {
    title: "Schedule Your Premium Tailored Leaked Credential Deep-Dive  Assets Review",
    lines: [
      {
        title: "Real Exposure, Real Consequences",
        content: "Leaked credentials are a direct gateway for attackers to move laterally and escalate privilege.",
      },
      {
        title: "Adversary-Grade Visibility",
        content:
          "Our threat intelligence identifies leaks across paste sites, dark markets, and malware logs - before they’re used.",
      },
      {
        title: "Work with Your Account Lead",
        content:
          "Book a session with your dedicated Cyberbay advisor to assess the scope, secure accounts, and close the loop.",
      },
    ],
  },
  "shadow-it": {
    title: "Book Your Shadow Asset Review With You Dedicated Account Manager",
    lines: [
      {
        title: "Untracked = Unprotected",
        content: "Tools, apps, and cloud services running without security oversight create silent risk.",
      },
      {
        title: "Risk with No Owner",
        content: "Shadow IT introduces vulnerabilities, blind spots, and compliance gaps across teams.",
      },
      {
        title: "Tailored Review, Clear Actions",
        content: "We’ll help you assess the exposure, map business context, and build a plan to secure the stack.",
      },
    ],
  },
};

// Extract the form logic that uses useSearchParams into a child component
const ContactFormInner: React.FC<any> = ({ title, headline, content }) => {
  const isMobile = useIsMobile();
  const [success, setSuccess] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const searchParams = useSearchParams();
  const sourceParam = searchParams.get("source");

  // Only allow valid sources from modalDetails
  const source = sourceParam && sourceLabels[sourceParam] ? sourceParam : null;

  const sourceData = source ? sourceContent[source] : null;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ContactUsFormType>({
    defaultValues: {
      request: source ? "Other" : "",
    },
  });

  const { submit, loading, error, called } = useSubmitContactUs(reset);
  const shouldShowSuccessMessage = called && !loading && !error;

  const onSubmit = async (data: ContactUsFormType) => {
    if (!recaptchaToken) {
      toast.error("Please complete the reCAPTCHA verification");
      return;
    }

    // Transform source key to label before sending to API
    const sourceLabel = source ? sourceLabels[source] : null;

    // Include the recaptcha token and source label with the form data
    submit({
      ...data,
      recaptchaToken,
      ...(sourceLabel && { source: sourceLabel }),
    });

    // Reset reCAPTCHA after submission
    if (shouldShowSuccessMessage) {
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
    }
  };

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  return (
    <div className={styles.container}>
      <div className={styles.gridContainer}>
        <div className="w-full lg:w-[40%]">
          {sourceData ? (
            <>
              <h2 className={`${styles.title} ${isMobile ? "heading-7" : "heading-2"} font-bold mb-6`}>
                {sourceData.title}
              </h2>
              <div className="flex flex-col gap-6">
                {sourceData.lines.map((line, idx) => {
                  let iconSvg = null;
                  if (idx === 0) {
                    // 2x2 grid icon
                    iconSvg = (
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="3" width="7" height="7" rx="2" fill="currentColor" />
                        <rect x="14" y="3" width="7" height="7" rx="2" fill="currentColor" />
                        <rect x="3" y="14" width="7" height="7" rx="2" fill="currentColor" />
                        <rect x="14" y="14" width="7" height="7" rx="2" fill="currentColor" />
                      </svg>
                    );
                  } else if (idx === 1) {
                    // Dollar sign in a circle
                    iconSvg = (
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                        <path
                          d="M12 7V17M15 9.5C15 8.11929 13.8807 7 12.5 7C11.1193 7 10 8.11929 10 9.5C10 10.8807 11.1193 12 12.5 12C13.8807 12 15 13.1193 15 14.5C15 15.8807 13.8807 17 12.5 17C11.1193 17 10 15.8807 10 14.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    );
                  } else if (idx === 2) {
                    // User in a circle
                    iconSvg = (
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                        <circle cx="12" cy="10" r="3" fill="currentColor" />
                        <path
                          d="M6 18c0-2.21 3.134-4 6-4s6 1.79 6 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          fill="none"
                        />
                      </svg>
                    );
                  }
                  return (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="mt-1">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                          <span className="text-blue-600">{iconSvg}</span>
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold mb-1">{line.title}</div>
                        <div className="text-gray-700 paragraph-md">{line.content}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <h2 className={`${styles.title} ${isMobile ? "heading-7" : "heading-2"} font-bold`}>{title}</h2>
              <p className={`${styles.description} paragraph-md`}>
                <span className="font-semibold">{headline}</span>
                <br />
                {content}
              </p>
            </>
          )}
        </div>

        <form id={formatBtnId("contact-form")} className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
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
                disabled={loading || !!source}
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
            id={formatBtnId("contact-form-submit")}
            className="paragraph-sm lg:paragraph-md mt-3 w-full self-start px-20 lg:w-fit"
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

export const ContactForm: React.FC<any> = (props) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContactFormInner {...props} />
    </Suspense>
  );
};
