"use client";

import React from "react";
import Image from "next/image";

const steps = [
  {
    id: 1,
    title: "Account Creation",
    description: "Confirm your domain and set up your bounty program preferences.",
    imagePath: "/platform/step-1.png",
  },
  {
    id: 2,
    title: "Program Configuration",
    description: "Define your scope, rewards, and program rules.",
    imagePath: "/platform/step-2.png",
  },
  {
    id: 3,
    title: "Launch & Monitor",
    description: "Review submissions and manage your program.",
    imagePath: "/platform/step-3.png",
  },
];

export const LaunchProgram = () => {
  const [currentStep, setCurrentStep] = React.useState(0);

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length);
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);
  };

  return (
    <section className="bg-neutral-50 py-16">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-6">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="space-y-8 text-primary-800">
            <span className="tagline">How It Works</span>
            <h2 className="heading-2 font-bold">Launch Your Bug Bounty Program With The Cyberbay Platform</h2>
            <p className="paragraph">Three simple steps to execute your bug bounty program.</p>
          </div>
          <div className="relative">
            <div className="absolute left-0 right-[-20px] top-1/2 z-50 flex -translate-y-1/2 items-center justify-between">
              <button
                onClick={prevStep}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-primary-800 transition-all hover:bg-neutral-50"
                style={{
                  boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
                }}
              >
                <Image src="/company/arrow-left.svg" alt="Previous" width={24} height={24} />
              </button>
              <button
                onClick={nextStep}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-primary-800 transition-all hover:bg-neutral-50"
                style={{
                  boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
                }}
              >
                <Image src="/company/arrow-right.svg" alt="Next" width={24} height={24} />
              </button>
            </div>
            <div className="relative mx-auto h-[512px] w-full max-w-lg">
              {steps.map((step, index) => {
                const position = (index - currentStep + steps.length) % steps.length;
                return (
                  <div
                    key={step.id}
                    className={`absolute left-0 top-0 h-[500px] w-full rounded-2xl bg-primary-500 p-8 transition-all duration-500 ${
                      position === 0
                        ? "z-30 translate-x-0 translate-y-0 opacity-100"
                        : position === 1
                          ? "z-20 translate-x-4 translate-y-4 opacity-40"
                          : "z-10 translate-x-8 translate-y-8 opacity-20"
                    }`}
                  >
                    <div className="flex h-full flex-col">
                      <div className="text-center text-white">
                        <span className="heading-7 mb-2 font-bold">Step {step.id}:</span>
                        <h4 className="heading-7 mb-4 font-bold">{step.title}</h4>
                        <p className="paragraph-md mb-8">{step.description}</p>
                      </div>
                      <div className="relative mt-auto flex-1 rounded-lg">
                        <Image
                          src={step.imagePath}
                          alt="Step Image"
                          layout="fill"
                          objectFit="contain"
                          className="rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
