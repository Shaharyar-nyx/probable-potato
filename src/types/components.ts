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
