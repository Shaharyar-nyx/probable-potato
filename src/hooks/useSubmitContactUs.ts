"use client";

import { useState } from "react";
import useCaptcha, { CaptchaAction } from "./useCaptcha";
import { ContactUsFormType } from "@/types";
import { cyberbayClient } from "@/lib/forms";
import { UseFormReset } from "react-hook-form";
import * as CompanyEmailValidator from "company-email-validator";
import { toast } from "react-toastify";

export async function submitContactUs(
  payload: ContactUsFormType,
  reset: UseFormReset<ContactUsFormType>,
  onDone: (error: Error | null, data: { message: string } | null) => void,
) {
  const isCompanyEmail = CompanyEmailValidator.isCompanyEmail(payload.email);

  const channel = "Contact Us Form";

  const payloadData = {
    data: {
      body: {
        ...payload,
        isSaveApollo: isCompanyEmail,
        request: [payload.request],
        channel,
      },
      name: channel,
      key: channel?.toLowerCase()?.replace(/\s+/g, "_"),
    },
  };

  try {
    await cyberbayClient.createContact(JSON.stringify(payloadData));
    reset();
    onDone(null, { message: "Thank you for reaching out! We will get back to you shortly." });
     toast.success("Thank you! We will get back to you shortly.");
  } catch (error) {
    console.error("Failed to create contact:", error);
    onDone(error instanceof Error ? error : new Error("Failed to submit form"), null);
    toast.error("Failed to submit form");
  }
}

export function useSubmitContactUs(reset: UseFormReset<ContactUsFormType>) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<{ message: string } | null>(null);
  const [called, setCalled] = useState(false);
  const executeRecaptcha = useCaptcha();

  function submit(payload: ContactUsFormType) {
    setLoading(true);

    executeRecaptcha(CaptchaAction.CONTACT_US_FORM_SUBMIT)
      .then(() => {
        console.log("Captcha verified");
        submitContactUs(payload, reset, (err, data) => {
          setLoading(false);
          setCalled(true);
          setError(err);
          setData(data);
        });
      })
      .catch((err) => {
        console.log("Captcha verification failed");
        setLoading(false);
        setCalled(true);
        setError(err instanceof Error ? err : new Error("Captcha verification failed"));
      });
  }
  return { loading, error, data, submit, called };
}
