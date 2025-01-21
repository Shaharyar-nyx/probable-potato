"use client";

import { useState } from "react";
import useCaptcha, { CaptchaAction } from "./useCaptcha";
import { DemoFormType } from "@/types";
import { cyberbayClient } from "@/lib";
import { UseFormReset } from "react-hook-form";
import * as CompanyEmailValidator from "company-email-validator";

export async function submitRequestDemo(
  payload: DemoFormType,
  reset: UseFormReset<DemoFormType>,
  onDone: (error: Error | null, data: { message: string } | null) => void,
) {
  const isCompanyEmail = CompanyEmailValidator.isCompanyEmail(payload.email);

  const payloadData = {
    ...payload,
    isSaveApollo: isCompanyEmail,
    channel: "Demo Form",
  };

  try {
    await cyberbayClient.createContact(payloadData);
    reset();
    onDone(null, { message: "Form submitted successfully!" });
  } catch (error) {
    console.error("Failed to create contact:", error);
    onDone(error instanceof Error ? error : new Error("Failed to submit form"), null);
  }
}

export function useSubmitRequestDemo(reset: UseFormReset<DemoFormType>) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<{ message: string } | null>(null);
  const [called, setCalled] = useState(false);
  const executeRecaptcha = useCaptcha();

  function submit(payload: DemoFormType) {
    setLoading(true);

    executeRecaptcha(CaptchaAction.REQUEST_DEMO_FORM_SUBMIT)
      .then(() => {
        console.log("Captcha verified");
        submitRequestDemo(payload, reset, (err, data) => {
          setLoading(false);
          setCalled(true);
          setError(err);
          setData(data);
        });
      })
      .catch((err) => {
        console.log(err, "Captcha verification failed");
        setLoading(false);
        setCalled(true);
        setError(err instanceof Error ? err : new Error("Captcha verification failed"));
      });
  }
  return { loading, error, data, submit, called };
}
