import React from 'react';
import Image from 'next/image';

export default function ContinuousBugHunting() {
  const features = [
    {
      title: 'Early Development',
      icon: '🔍',
      description: 'Integrate security testing from the start'
    },
    {
      title: 'Product Launch Protection',
      icon: '🚀',
      description: 'Ensure secure deployment with pre-launch testing'
    },
    {
      title: 'Ongoing Maintenance',
      icon: '🛡️',
      description: 'Continuous monitoring and vulnerability assessment'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Continuous Bug Hunting Through the Product Development Lifecycle
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Enhance your security posture at every stage of development with our comprehensive
            bug hunting solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Step 1: Account Creation</h3>
              <p className="text-gray-600 mb-6">
                Get started with a simple account setup process. Configure your preferences
                and security requirements to match your organization's needs.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Quick registration process</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Customizable security settings</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
