import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers | Cyberbay',
  description: 'Join our team at Cyberbay and help shape the future of cybersecurity. Explore exciting career opportunities and grow with us.',
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
