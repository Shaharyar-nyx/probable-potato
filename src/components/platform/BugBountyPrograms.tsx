import React from "react";
import Image from "next/image";

export default function BugBountyPrograms() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <span>Cost-Effective Scalability with On-Demand, Pre-Vetted Talent</span>
            <h2 className="mb-6 text-3xl font-bold">Bug Bounty Programs</h2>
            <p className="mb-8 text-gray-600">
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
