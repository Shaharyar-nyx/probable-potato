import React from 'react';
import Image from 'next/image';

interface BenefitCardProps {
  title: string;
  icon: string;
}

export function BenefitCard({ title, icon }: BenefitCardProps) {
  return (
    <div className="p-6 bg-blue-900 rounded-lg hover:bg-blue-800 transition-colors">
      <div className="w-10 h-10 mb-4 bg-blue-800 rounded-lg flex items-center justify-center">
        <Image
          src={`/icons/${icon}.svg`}
          alt={title}
          width={24}
          height={24}
          className="text-white"
        />
      </div>
      <h3 className="font-semibold text-white">{title}</h3>
    </div>
  );
}
