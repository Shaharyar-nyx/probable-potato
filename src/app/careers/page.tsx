'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { JobListing } from '@/components/Blocks/JobListing';
import { BenefitCard } from '@/components/Blocks/BenefitCard';

const jobOpenings = [
  {
    title: 'Senior Software Engineer',
    contractType: 'Full Time',
    location: 'Hong Kong',
  },
  {
    title: 'Senior Sales Engineer',
    contractType: 'Full Time',
    location: 'Colombia',
  },
  {
    title: 'Product Security Analyst',
    contractType: 'Full Time',
    location: 'Hong Kong',
  },
];

const benefits = [
  { title: 'Salary & bonuses', icon: 'salary' },
  { title: 'Flexible remote work', icon: 'remote' },
  { title: 'Paid time off', icon: 'time' },
  { title: 'Health insurance', icon: 'health' },
  { title: 'Wellness programs', icon: 'wellness' },
  { title: 'Flexible hours', icon: 'hours' },
  { title: 'Constant challenges', icon: 'challenges' },
  { title: 'Career growth', icon: 'growth' },
];

const partners = [
  'NAVER',
  'HKT',
  'TransUnion',
  'PCCW',
  'CyberAir',
  'RICOH',
];

export default function CareersPage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[500px] bg-gradient-to-r from-blue-900 to-blue-950">
        <div className="absolute inset-0">
          <Image
            src="/images/network-bg.jpg"
            alt="Network Background"
            fill
            className="object-cover opacity-20 mix-blend-overlay"
            priority
          />
        </div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            We&apos;re Always on the Look<br />
            Out for Exceptional Talent
          </h1>
          <p className="text-gray-300 text-lg">
            Submit your information below or email careers@cyberbay.tech
          </p>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Open Positions</h2>
          <p className="text-gray-600 mb-8">
            Explore exciting career opportunities and help shape the future of cybersecurity today.
          </p>

          <div className="space-y-4">
            {jobOpenings.map((job, index) => (
              <JobListing
                key={index}
                title={job.title}
                contractType={job.contractType}
                location={job.location}
                onApply={() => window.open('/careers/apply', '_blank')}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-blue-950 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-blue-400 font-medium mb-4">Why You'll Love Working With Us</p>
            <h2 className="text-3xl font-bold mb-4">Boost your career with our benefits</h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              We believe in investing in our people. When we care, we develop careers, expand your growth, maximize your efficiency, offering competitive compensation and benefits.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <BenefitCard
                key={index}
                title={benefit.title}
                icon={benefit.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Image
                  src="/icons/chat.svg"
                  alt="Chat"
                  width={24}
                  height={24}
                  className="text-white"
                />
              </div>
              <div>
                <h3 className="font-semibold">Chat to us</h3>
                <p className="text-gray-600">Got a question? We&apos;re here to help.</p>
                <a href="mailto:careers@cyberbay.tech" className="text-blue-600 hover:text-blue-700">
                  careers@cyberbay.tech
                </a>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-2">Your next career move starts here.</h2>
              <p className="text-gray-600 mb-6">Let&apos;s grow together.</p>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <label htmlFor="fullname" className="text-sm font-medium text-gray-700">Full Name</label>
                  <Input id="fullname" placeholder="Enter your full name" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                  <Input id="email" type="email" placeholder="Enter your email address" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="resume" className="text-sm font-medium text-gray-700">Upload Resume</label>
                  <Input
                    id="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  <p className="text-xs text-gray-500">Accepted formats: PDF, DOC, DOCX</p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-700">Your Message</label>
                  <Textarea 
                    id="message"
                    placeholder="Tell us what's exciting about the future of cybersecurity..."
                    rows={4}
                  />
                </div>

                <Button type="submit" className="w-full">
                  Submit Application
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12">Trusted by industry leaders worldwide</h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center">
            {partners.map((partner, index) => (
              <div key={index} className="flex items-center justify-center grayscale hover:grayscale-0 transition-all">
                <Image
                  src={`/logos/${partner.toLowerCase()}.svg`}
                  alt={partner}
                  width={120}
                  height={40}
                  className="opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
