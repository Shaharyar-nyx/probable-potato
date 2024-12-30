import * as HeroIcons from "@heroicons/react/24/outline";
import React from "react";

import { IconRendererProps } from "@/types";

export const IconRenderer: React.FC<IconRendererProps> = ({ iconName, className }) => {
  const IconComponent = HeroIcons[iconName as keyof typeof HeroIcons];

  if (IconComponent === undefined) {
    return null;
  }

  return <IconComponent className={className} />;
};
