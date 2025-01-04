import React, { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

import { solutionsContent } from "@/data/solutions";

export interface HeaderProps {
  backgroundImage: string;
  cta?: {
    icon?: string;
    label: string;
    link: string;
  };
  description: string;
  title: string;
}

export interface SolutionCardProps {
  description: string;
  icon: string;
  isEven: boolean;
  link?: string;
  title: string;
}

export interface SolutionsProps {
  content?: typeof solutionsContent;
}

interface BaseButtonProps {
  children: React.ReactNode;
  className?: string;
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
    externalHref: string;
    href?: never;
  };

export type ButtonProps = ButtonAsButton | ButtonAsInternalLink | ButtonAsExternalLink;

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
  buttonText: string;
  description: string;
  href?: string;
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
  core: {
    description: string;
    name: string;
    social: {
      icon: string;
      link: string;
    }[];
    title: string;
  }[];
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
