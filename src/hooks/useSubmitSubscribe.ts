// src/hooks/useSubmitSubscribe.ts
"use client";

import { useState } from "react";
import type { SubscribeType } from "@/types"; // <-- if this path fails, use "../types" or correct alias

type HookReturn = {
  submit: (data: SubscribeType) => Promise<void>;
  loading: boolean;
  error: string | null;
  called: boolean;
};

export function useSubmitSubscribe(reset: () => void): HookReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [called, setCalled] = useState(false);

  const submit = async (data: SubscribeType) => {
    setLoading(true);
    setError(null);
    setCalled(false);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // 👇 ONLY send email, nothing else – no captcha token
        body: JSON.stringify({ email: data.email }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Failed to subscribe");
      }

      // success – trigger thank-you message on the footer
      setCalled(true);
      reset();
    } catch (e: any) {
      console.error("Subscribe error:", e);
      setError(e.message || "Failed to subscribe");
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, error, called };
}