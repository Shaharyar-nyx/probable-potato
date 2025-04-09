export type ContactUsFormType = {
  email: string;
  message: string;
  name: string;
  request: string;
  recaptchaToken?: string | null;
};

export type ApplyFormType = {
  email: string;
  message: string;
  name: string;
  file: File | null;
  recaptchaToken?: string | null;
};

export type DemoFormType = {
  email: string;
  message?: string;
  name: string;
  title: string;
  website_url: string;
  request: string[];
  recaptchaToken?: string | null;
};

export type ContactSalesFormType = {
  email: string;
  message?: string;
  name: string;
  organization_name: string;
  title: string;
  recaptchaToken?: string | null;
};

export type ReportFormType = {
  email: string;
  message: string;
  name: string;
  website_url: string;
  title: string;
  recaptchaToken?: string | null;
};

export type SubscribeType = {
  email: string;
};


export type PaginationProps = {
  total: number;
  currentPage: number;
  perPage: number;
  setCurrentPage: Function | null
}

export type NewsItemType = {
  id: number;
  corporateName: string;
  corporateDomain: string;
  corporateIndustry: string;
  newsSummary: string;
  accidentType: string;
  accidentSource: string;
  accidentDate: string;
  country: string;
  countryFlag: string;
  industry: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  newsUrl: string;
}