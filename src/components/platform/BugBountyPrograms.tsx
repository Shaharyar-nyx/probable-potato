import React from 'react';
import Image from 'next/image';

export default function BugBountyPrograms() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Bug Bounty Programs</h2>
            <p className="text-gray-600 mb-8">
              Set up and manage your bug bounty programs with ease. Our platform provides
              comprehensive tools for vulnerability management and researcher engagement.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Streamlined Program Setup</h3>
                  <p className="text-gray-600">Launch your bug bounty program in minutes with our intuitive setup wizard</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Automated Triage</h3>
                  <p className="text-gray-600">Efficiently process and prioritize incoming vulnerability reports</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-blue-50 rounded-lg p-6">
              <Image
                src="/platform-dashboard.png"
                alt="Bug Bounty Dashboard"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
