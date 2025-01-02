import React, { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

import { solutionsContent } from "@/data/solutions";

export interface HeaderProps {
  backgroundImage: string;
  description: string;
  title: string;
}

export interface SolutionCardProps {
  description: string;
  icon: string;
  isEven: boolean;
  title: string;
}

export interface SolutionsProps {
  content?: typeof solutionsContent;
}

interface BaseButtonProps {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  loading?: boolean;
  size?: "large" | "medium" | "small";
  transparent?: boolean;
  variant?: "primary" | "neutral";
}

export type ButtonAsButton = BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    externalHref?: never;
    href?: never;
  };

export type ButtonAsInternalLink = BaseButtonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    externalHref?: never;
    href: string;
  };

export type ButtonAsExternalLink = BaseButtonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
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
