import React, { ButtonHTMLAttributes } from "react";

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

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  loading?: boolean;
  size?: "large" | "medium" | "small";
  transparent?: boolean;
  variant?: "primary" | "neutral";
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
