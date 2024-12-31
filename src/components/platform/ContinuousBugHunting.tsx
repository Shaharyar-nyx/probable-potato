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
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-6">
        <div className="space-y-8 text-center">
          <span className="tagline text-primary-800">Drive Process Improvement</span>
          <h2 className="heading-2 mx-auto max-w-6xl font-bold text-primary-800">
            Continuous Bug Hunting Through the Product Development Lifecycle
          </h2>
          <p className="text-primary-800">
            Traditional bug testing frequently fails to identify critical vulnerabilities. Implementing continuous bug
            hunting across your entire product development lifecycle enables proactive identification and resolution of
            root causes through process optimization, ultimately improving process and product quality.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-screen-lg gap-16 md:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="rounded-lg bg-primary-800 p-8 shadow-md transition-shadow hover:shadow-lg">
              <div className="mb-4 text-4xl">{feature.icon}</div>
              <h3 className="mb-2 text-xl font-semibold text-neutral-50">{feature.title}</h3>
              <p className="text-neutral-50">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
