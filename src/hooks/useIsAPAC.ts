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

export default function useIsAPAC() {
  const [isAPAC, setIsAPAC] = useState<boolean | null>(null); // null = unknown

  const { data, error, isLoading } = useSWR("https://ipapi.co/json/", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  useEffect(() => {
    if (data && data.country) {
      const isApac = apacCountries.includes(data.country);
      setIsAPAC(isApac);
    }
  }, [data, error]);

  return {
    isAPAC,
    isLoading,
    error,
    country: data?.country,
  };
}
