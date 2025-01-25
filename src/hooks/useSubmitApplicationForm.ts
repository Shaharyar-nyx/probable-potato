"use client";

import { useState } from "react";
import useCaptcha, { CaptchaAction } from "./useCaptcha";
import { ApplyFormType } from "@/types";
import { cyberbayClient } from "@/lib";
import { UseFormReset } from "react-hook-form";

export async function submitApplicationForm(
  payload: ApplyFormType,
  reset: UseFormReset<ApplyFormType>,
  onDone: (error: Error | null, data: { message: string } | null) => void,
) {
  const channel = "Careers Form";

  const payloadData = {
    data: {
      body: {
        ...payload,
        isSaveApollo: false,
        channel,
      },
      name: channel,
      key: channel?.toLowerCase()?.replace(/\s+/g, "_"),
    },
  };


  try {
    await cyberbayClient.createContact(JSON.stringify(payloadData));
    reset();
    onDone(null, { message: "Form submitted successfully!" });
  } catch (error) {
    console.error("Failed to create contact:", error);
    onDone(error instanceof Error ? error : new Error("Failed to submit form"), null);
  }
}

export function useSubmitApplicationForm(reset: UseFormReset<ApplyFormType>) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<{ message: string } | null>(null);
  const [called, setCalled] = useState(false);
  const executeRecaptcha = useCaptcha();

  function submit(payload: ApplyFormType) {
    setLoading(true);
    executeRecaptcha(CaptchaAction.CAREERS_FORM_SUBMIT)
      .then(() => {
        console.log("Captcha verified");
        submitApplicationForm(payload, reset, (err, data) => {
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
