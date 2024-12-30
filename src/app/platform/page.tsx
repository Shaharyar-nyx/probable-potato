import React from 'react';
import { Metadata } from 'next';
import HeroSection from '@/components/platform/HeroSection';
import BugBountyPrograms from '@/components/platform/BugBountyPrograms';
import ContinuousBugHunting from '@/components/platform/ContinuousBugHunting';
import LaunchProgram from '@/components/platform/LaunchProgram';
import Packages from '@/components/platform/Packages';
import ExpertGuidance from '@/components/platform/ExpertGuidance';

export const metadata: Metadata = {
  title: 'Cyberbay Platform - Fortify, Scale, and Triage',
  description: 'Discover how our platform helps you manage bug bounty programs effectively with continuous bug hunting through the product development lifecycle.',
};

export default function PlatformPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <BugBountyPrograms />
      <ContinuousBugHunting />
      <LaunchProgram />
      <Packages />
      <ExpertGuidance />
    </main>
  );
}
