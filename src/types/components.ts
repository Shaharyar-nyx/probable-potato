import React, { AnchorHTMLAttributes, ButtonHTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { UseFormClearErrors, UseFormRegister, UseFormSetError, UseFormSetValue } from "react-hook-form";

export interface HeroProps {
  background_file: string;
  cta?: {
    icon?: string;
    isModal?: boolean;
    label: string;
    link?: string;
  };
  description: string;
  featuredImage: {
    alt: string;
    image: string;
  };
  title: string;
}
export interface HeaderProps {
  backgroundImage: string;
  cta?: {
    icon?: string;
    isModal?: boolean;
    label: string;
    link?: string;
  };
  description: string;
  tagline?: string;
  title: string;
}

export interface BrandMissionProps {
  description: string;
  tags: string[];
  teamMembers: {
    image: string;
    name: string;
    title: string;
  }[];
  title: string;
}

export interface SolutionCardProps {
  content: string;
  icon: any;
  isEven?: boolean;
  cta_text?: string;
  cta_url?: string;
  title: string;
}

export interface SolutionsProps {
  crowdsourcing: {
    benefits: {
      description: string;
      link: string | null;
      title: string;
    }[];
    description: string;
    label: string;
    title: string;
  };
  solutions: SolutionCardProps[];
  title: string;
}

export interface TestimonialsProps {
  testimonials: {
    author: string;
    client: string;
    logo: string;
    position: string;
    quote: string;
  }[];
}

export interface ClientsProps {
  clients: {
    logo: string;
    name: string;
  }[];
  title: string;
}

export interface Feature {
  cyberscan?: boolean | string;
  cybershield?: boolean | string;
  cyberswarm?: boolean | string;
  name: string;
  tooltip?: string;
}

export interface PackageData {
  description: string;
  period?: string;
  price: string;
  cta?: {
    icon?: string;
    isModal?: boolean;
    label: string;
    link?: string;
  };
}

export interface PackagesProps {
  backgroundImage: string | null;
  description: string;
  features: Feature[];
  packages: Record<string, PackageData>;
  title: string;
}

export interface BaseButtonProps {
  children?: React.ReactNode;
  className?: string;
  error?: string;
  icon?: React.ReactNode;
  iconName?: string;
  loading?: boolean;
  size?: "large" | "medium" | "small";
  transparent?: boolean;
  variant?: "primary" | "neutral";
}

export type ButtonAsButton = BaseButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    externalHref?: never;
    href?: never;
  };

export type ButtonAsInternalLink = BaseButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    externalHref?: never;
    href: string;
  };

export type ButtonAsExternalLink = BaseButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    externalHref?: string;
    href?: never;
  };

export type ButtonProps = ButtonAsButton | ButtonAsInternalLink | ButtonAsExternalLink;

export interface InputFileProps {
  clearErrors?: UseFormClearErrors<any>;
  error?: string;
  loading?: boolean;
  id?: string;
  maxFileSize: number;
  name: string;
  register?: UseFormRegister<any>;
  setError?: UseFormSetError<any>;
  setValue?: UseFormSetValue<any>;
  className?: string;
  children?: React.ReactNode;
}

export interface IconRendererProps {
  className?: string;
  iconName: string;
}

export interface JobListingProps {
  contractType: string;
  location: string;
  onApply?: () => void;
  title: string;
}

export interface BenefitCardProps {
  icon: string;
  title: string;
}

export interface CTAProps {
  backgroundImage: {
    src: string;
  };
  cta?: {
    icon?: string;
    isModal?: boolean;
    label: string;
    link?: string;
  };
  description: string;
  tagline?: string;
  title: string;
}

export interface IntroductionProps {
  description: string;
  title: string;
}

export interface AccordionProps {
  items: {
    content: string;
    title: string;
  }[];
}

export interface BugBountyProgramsProps {
  description: string;
  slides: {
    description: string;
    images: string;
    subtitle: string;
    title: string;
  }[];
  subtitle: string;
  title: string;
}

export interface OurCultureProps {
  buttonText: string;
  content: string;
  coreTitle: string;
  features: {
    icon: string;
    text: string;
    title: string;
  }[];
  title: string;
}

export interface OurCoreTeamProps {
  content: string;
  member_profiles: {
    data: {
      attributes: {
        name: string;
        job_title: string;
        social_links: {
          data: {
            attributes: {
              icon: {
                data: {
                  attributes: {
                    name: string;
                    url: string;
                  };
                };
              };
            };
          }[];
        };
      };
    }[];
  };
  title: string;
}

export interface NewsProps {
  content: string;
  news: {
    category: string;
    description: string;
    image: string;
    link: string;
    readTime: string;
    title: string;
  }[];
  subtitle: string;
  title: string;
}

export interface EventsProps {
  content: string;
  subtitle: string;
  title: string;
  upcomingEvents: {
    date: string;
    description: string;
    image: string;
    link: string;
    location: string;
    title: string;
    type: string;
  }[];
}

export interface TaglineProps {
  buttonText: string;
  content: string;
  title: string;
}

export interface BugBountyGridProps {
  content: string;
  gridLeft: {
    description: string;
    icon: string;
    title: string;
  };
  gridRight: {
    description: string;
    icon: string;
    title: string;
  };
  tagline: string;
  title: string;
}

export interface ContinuousBugHuntingProps {
  content: string;
  features: {
    description: string;
    icon: string;
    title: string;
  }[];
  tagline: string;
  title: string;
}

export interface LaunchProgramProps {
  content: string;
  steps: {
    description: string;
    icon: string;
    title: string;
  }[];
  tagline: string;
  title: string;
}

export interface FindingBugBountyProps {
  content: string;
  features: {
    icon: string;
    text: string;
    title: string;
  }[];
  tagline: string;
  title: string;
}

export interface ImportanceBugTestingProps {
  content: string;
  features: {
    icon: string;
    text: string;
    title: string;
  }[];
  tagline: string;
  title: string;
}

export interface SafeguardsProps {
  content: string;
  icon: any;
  isEven?: boolean;
  title: string;
}

export interface ProgramSafeguardsProps {
  content: string;
  safeguards: SafeguardsProps[];
  title: string;
}

export interface ProgramTypeProps {
  content: string;
  features: {
    content: string;
    icon: string;
    text: string;
    title: string;
  }[];
  title: string;
}
export interface SemiCircleProps {
  data: { icon: any; content: string; title: string }[];
  text: string;
}

export interface BenefitsProps {
  benefits: {
    icon: string;
    title: string;
  }[];
  subtitle: string;
  title: string;
  description: string;
}

export interface JobOpeningsProps {
  jobOpenings: {
    contractType: string;
    location: string;
    title: string;
    link: string;
  }[];
}

export interface ModalProps {
  buttonSize?: "large" | "medium" | "small";
  buttonStyle?: string;
  buttonVariant?: "primary" | "neutral";
  buttonTransparent?: boolean;
  className?: string;
  cta?: {
    icon?: string;
    isModal?: "contact_sales_form" | "demo_form" | "free_report_form";
    label: string;
  };
}
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  iconName?: string;
  parentClassName?: string;
}

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  iconName?: string;
  parentClassName?: string;
}

export interface DropdownPropsInput {
  ariaDescribedBy?: string;
  className?: string;
  disabled?: boolean;
  error?: string;
  handleChange?: (value: string | string[]) => void;
  iconName?: string;
  id?: string;
  label: string;
  multiple?: boolean;
  options: string[];
  value?: string | string[];
  onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface BlockType {
  __typename?: string;
  collection: string;
  item: any;
  sort: number;
}
