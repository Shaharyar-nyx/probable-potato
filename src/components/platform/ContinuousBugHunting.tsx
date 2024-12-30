import React from "react";
import Image from "next/image";

export default function ContinuousBugHunting() {
  const features = [
    {
      title: "Early Development",
      icon: "🔍",
      description: "Integrate security testing from the start",
    },
    {
      title: "Product Launch Protection",
      icon: "🚀",
      description: "Ensure secure deployment with pre-launch testing",
    },
    {
      title: "Ongoing Maintenance",
      icon: "🛡️",
      description: "Continuous monitoring and vulnerability assessment",
    },
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold">Continuous Bug Hunting Through the Product Development Lifecycle</h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Enhance your security posture at every stage of development with our comprehensive bug hunting solutions.
          </p>
        </div>

        <div className="mb-16 grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
              <div className="mb-4 text-4xl">{feature.icon}</div>
              <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl bg-white p-8 shadow-lg">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-2xl font-bold">Step 1: Account Creation</h3>
              <p className="mb-6 text-gray-600">
                Get started with a simple account setup process. Configure your preferences and security requirements to
                match your organization's needs.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Quick registration process</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Customizable security settings</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Immediate platform access</span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <Image
                src="/account-creation.png"
                alt="Account Creation Process"
                width={500}
                height={300}
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
