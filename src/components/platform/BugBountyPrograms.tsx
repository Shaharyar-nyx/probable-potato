import React from "react";
import Image from "next/image";

export default function BugBountyPrograms() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-6">
        <div className="grid items-center gap-16 md:grid-cols-2">
          <div className="space-y-8 text-primary-800">
            <span className="tagline">Cost-Effective Scalability with On-Demand, Pre-Vetted Talent</span>
            <h2 className="mb-6 text-3xl font-bold">Bug Bounty Programs</h2>
            <p className="text-p">
              Identifying vulnerabilities requires diverse skills often not available in-house. Crowdsourcing offers a
              highly effective solution, and the Cyberbay Platform connects you with pre-vetted bug hunters who provide
              specialized expertise when you need it.
            </p>
          </div>
          <div className="relative">
            <div className="rounded-lg bg-blue-50 p-6">
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
