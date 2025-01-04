import React from "react";
import Image from "next/image";

export const ContinuousBugHunting = () => {
  const features = [
    {
      title: "Early\nDevelopment",
      icon: "/platform/development.svg",
      description: "Integrate security testing from the start",
    },
    {
      title: "Product\nLaunch Protection",
      icon: "/platform/protection.svg",
      description: "Ensure secure deployment with pre-launch testing",
    },
    {
      title: "Ongoing Maintenance\nand Updates",
      icon: "/platform/maintenance.svg",
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

        <div className="mx-auto mt-16 grid max-w-6xl gap-16 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative flex h-[300px] flex-col justify-between rounded-lg bg-primary-800 p-12 shadow-md transition-all duration-300 ease-in-out hover:bg-primary-500"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  height={105}
                  width={105}
                  className="text-4xl transition-all duration-300 ease-in-out group-hover:scale-100"
                />
                <h3 className="heading-7 font-bold text-neutral-50 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100">
                  {feature.title}
                </h3>
              </div>
              <div className="relative flex h-32 flex-col items-end justify-end">
                <p className="paragraph-md absolute left-0 right-0 text-neutral-50 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100">
                  {feature.description}
                </p>
                <h3 className="heading-7 absolute left-0 right-0 whitespace-pre font-bold text-neutral-50 transition-all duration-300 ease-in-out group-hover:translate-y-8 group-hover:opacity-0">
                  {feature.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
