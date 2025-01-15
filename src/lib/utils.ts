export const formatToCurrency = (number: number, locale: string = "en-US", currency: string = "USD"): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
};

export const formatNumberWithCommas = (points: string): string => {
  return parseInt(points, 10).toLocaleString("en-US");
};

export const getOrdinalSuffix = (n: number): string => {
  const j = n % 10;
  const k = n % 100;
  if (j === 1 && k !== 11) return n + "st";
  if (j === 2 && k !== 12) return n + "nd";
  if (j === 3 && k !== 13) return n + "rd";
  return n + "th";
}

export const removeLastTrailingSlash = (url: string) => {
  if (typeof url !== "string") return url;
  return url.replace(/\/$/, "");
}