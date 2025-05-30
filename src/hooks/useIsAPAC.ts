"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";

const apacCountries = [
  "AU",
  "NZ",
  "CN",
  "JP",
  "KR",
  "SG",
  "MY",
  "ID",
  "TH",
  "VN",
  "PH",
  "HK",
  "IN",
  "PK",
  "BD",
  "LK",
  "NP",
  "MM",
  "KH",
  "LA",
  "MN",
  "BN",
  "PG",
  "FJ",
  "WS",
];

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const detectCountryUri = process.env.LOCATION_CHECK_URL ?? "/country-check";

export function useIsAPAC() {
  const [isAPAC, setIsAPAC] = useState<boolean>(true);
  const [country, setCountry] = useState<string | null>("");

  const { data, isLoading, error } = useSWR(`${detectCountryUri}`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  useEffect(() => {
    if (data && data.country) {
      const { country } = data;
      const code = (country ?? "").toUpperCase();
      const isApac = apacCountries.includes(code);
      setCountry(code);
      setIsAPAC(isApac);
    }
  }, [data, error]);

  return {
    isAPAC,
    isLoading,
    error,
    country,
  };
}
