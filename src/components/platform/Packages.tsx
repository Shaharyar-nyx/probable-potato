import React from 'react';
import Link from 'next/link';

export default function Packages() {
  const features = [
    'Vulnerability Management',
    'Researcher Access',
    'API Integration',
    'Custom Workflows',
    'Analytics Dashboard',
    'Priority Support',
    'Team Management',
    'Custom Reporting',
    'Advanced Security',
    'SLA Guarantees'
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-16">Cyberbay Packages</h2>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Standard Package */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h3 className="text-xl font-bold mb-2">CyberNite</h3>
              <div className="text-3xl font-bold mb-4">
                $10,000
                <span className="text-sm font-normal text-gray-600">/year</span>
              </div>
              <p className="text-gray-600">Perfect for growing organizations</p>
            </div>
            <Link
              href="/contact"
              className="block w-full py-3 px-6 text-center bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mb-8"
            >
              Get Started
            </Link>
          </div>

          {/* Enterprise Package */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-lg p-8 text-white">
            <div className="text-center mb-8">
              <h3 className="text-xl font-bold mb-2">CyberElite</h3>
              <div className="text-3xl font-bold mb-4">Get a Quote</div>
              <p className="text-blue-100">Custom solutions for enterprise needs</p>
            </div>
            <Link
              href="/contact"
              className="block w-full py-3 px-6 text-center bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors mb-8"
            >
              Contact Sales
            </Link>
          </div>
        </div>

        {/* Package Features */}
        <div className="mt-16 max-w-5xl mx-auto">
          <h3 className="font-semibold mb-6">Package Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
