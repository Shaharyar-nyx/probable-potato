"use client";

import Image from "next/image";
import React from "react";

import { BenefitCard, Input, JobListing, Textarea } from "@/components";

import { Button } from "components/UI/button";

const jobOpenings = [
  {
    title: "Senior Software Engineer",
    contractType: "Full Time",
    location: "Hong Kong",
  },
  {
    title: "Senior Sales Engineer",
    contractType: "Full Time",
    location: "Colombia",
  },
  {
    title: "Product Security Analyst",
    contractType: "Full Time",
    location: "Hong Kong",
  },
];

const benefits = [
  { title: "Salary & bonuses", icon: "salary" },
  { title: "Flexible remote work", icon: "remote" },
  { title: "Paid time off", icon: "time" },
  { title: "Health insurance", icon: "health" },
  { title: "Wellness programs", icon: "wellness" },
  { title: "Flexible hours", icon: "hours" },
  { title: "Constant challenges", icon: "challenges" },
  { title: "Career growth", icon: "growth" },
];

const partners = ["NAVER", "HKT", "TransUnion", "PCCW", "CyberAir", "RICOH"];

const CareersPage: React.FC = () => {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[500px] bg-gradient-to-r from-blue-900 to-blue-950">
        <div className="absolute inset-0">
          <Image
            alt="Network Background"
            className="object-cover opacity-20 mix-blend-overlay"
            fill
            priority
            src="/images/network-bg.jpg"
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 py-20">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            We&apos;re Always on the Look
            <br />
            Out for Exceptional Talent
          </h1>
          <p className="text-lg text-gray-300">Submit your information below or email careers@cyberbay.tech</p>
        </div>
      </section>

      {/* Open Positions */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-3xl font-bold">Open Positions</h2>
          <p className="mb-8 text-gray-600">
            Explore exciting career opportunities and help shape the future of cybersecurity today.
          </p>

          <div className="space-y-4">
            {jobOpenings.map((job, index) => (
              <JobListing
                key={index}
                contractType={job.contractType}
                location={job.location}
                title={job.title}
                onApply={() => window.open("/careers/apply", "_blank")}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-blue-950 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <p className="mb-4 font-medium text-blue-400">Why You&#39;ll Love Working With Us</p>
            <h2 className="mb-4 text-3xl font-bold">Boost your career with our benefits</h2>
            <p className="mx-auto max-w-3xl text-gray-300">
              We believe in investing in our people. When we care, we develop careers, expand your growth, maximize your
              efficiency, offering competitive compensation and benefits.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {benefits.map((benefit, index) => (
              <BenefitCard key={index} icon={benefit.icon} title={benefit.title} />
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl">
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                <Image alt="Chat" className="text-white" height={24} src="/icons/chat.svg" width={24} />
              </div>
              <div>
                <h3 className="font-semibold">Chat to us</h3>
                <p className="text-gray-600">Got a question? We&apos;re here to help.</p>
                <a className="text-blue-600 hover:text-blue-700" href="mailto:careers@cyberbay.tech">
                  careers@cyberbay.tech
                </a>
              </div>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-sm">
              <h2 className="mb-2 text-2xl font-bold">Your next career move starts here.</h2>
              <p className="mb-6 text-gray-600">Let&apos;s grow together.</p>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700" htmlFor="fullname">
                    Full Name
                  </label>
                  <Input id="fullname" placeholder="Enter your full name" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700" htmlFor="email">
                    Email
                  </label>
                  <Input id="email" placeholder="Enter your email address" type="email" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700" htmlFor="resume">
                    Upload Resume
                  </label>
                  <Input
                    accept=".pdf,.doc,.docx"
                    className="cursor-pointer file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
                    id="resume"
                    type="file"
                  />
                  <p className="text-xs text-gray-500">Accepted formats: PDF, DOC, DOCX</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700" htmlFor="message">
                    Your Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell us what's exciting about the future of cybersecurity..."
                    rows={4}
                  />
                </div>

                <Button className="w-full" type="submit">
                  Submit Application
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-2xl font-bold">Trusted by industry leaders worldwide</h2>
          <div className="grid grid-cols-2 items-center gap-8 md:grid-cols-6">
            {partners.map((partner, index) => (
              <div key={index} className="flex items-center justify-center grayscale transition-all hover:grayscale-0">
                <Image
                  alt={partner}
                  className="opacity-70 transition-opacity hover:opacity-100"
                  height={40}
                  src={`/logos/${partner.toLowerCase()}.svg`}
                  width={120}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default CareersPage;
