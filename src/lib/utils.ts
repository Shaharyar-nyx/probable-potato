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
