import Image from "next/image";
import React from "react";

import { BenefitCardProps } from "@/types";

export const BenefitCard: React.FC<BenefitCardProps> = ({ title, icon }) => {
  return (
    <div className="rounded-lg bg-blue-900 p-6 transition-colors hover:bg-blue-800">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-800">
        <Image alt={title} className="text-white" height={24} src={`/icons/${icon}.svg`} width={24} />
      </div>
      <h3 className="font-semibold text-white">{title}</h3>
    </div>
  );
};
