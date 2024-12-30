import React from 'react';
import Image from 'next/image';

export default function LaunchProgram() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">
              Launch Your Bug Bounty Program With The Cyberbay Platform
            </h2>
            <p className="text-gray-600 mb-8">
              From setup to success, we provide all the tools and support you need to run an
              effective bug bounty program.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold">Configure Your Program</h3>
                  <p className="text-sm text-gray-600">Set scope, rewards, and requirements</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold">Invite Researchers</h3>
                  <p className="text-sm text-gray-600">Connect with skilled security experts</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold">Manage Reports</h3>
                  <p className="text-sm text-gray-600">Efficiently handle vulnerability reports</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <Image
              src="/launch-program.png"
              alt="Launch Program Interface"
              width={600}
              height={400}
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
