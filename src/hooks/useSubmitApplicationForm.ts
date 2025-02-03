"use client";

import { useState } from "react";
import useCaptcha, { CaptchaAction } from "./useCaptcha";
import { ApplyFormType } from "@/types";
import { CYBERBAY_CMS_URL } from "@/lib";
import { UseFormReset } from "react-hook-form";
import { toast } from "react-toastify";

export async function submitApplicationForm(
  payload: any,
  reset: UseFormReset<ApplyFormType>,
  onDone: (error: Error | null, data: { message: string } | null) => void,
) {
  try {
    await fetch(`${CYBERBAY_CMS_URL}/api/forms`, {
      method: "POST",
      body: payload,
    });
    reset();
    onDone(null, { message: "Thank you for reaching out! We will get back to you shortly." });
     toast.success("Thank you! We will get back to you shortly.");
  } catch (error) {
    console.error("Failed to create contact:", error);
    onDone(error instanceof Error ? error : new Error("Failed to submit form"), null);
    toast.error("Failed to submit form");
  }
}

export function useSubmitApplicationForm(reset: UseFormReset<ApplyFormType>) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<{ message: string } | null>(null);
  const [called, setCalled] = useState(false);
  const executeRecaptcha = useCaptcha();

  function submit(payload: any) {
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
