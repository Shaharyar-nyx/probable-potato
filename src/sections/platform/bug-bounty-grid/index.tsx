import React from "react";
import Image from "next/image";
import missionsWindow from "public/platform/missions-window.png";

export const BugBountyGrid: React.FC = () => {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="grid items-center gap-16 md:grid-cols-2">
          <div className="space-y-8 text-primary-800">
            <span className="tagline">Cost-Effective Scalability with On-Demand, Pre-Vetted Talent</span>
            <h2 className="mb-6 text-3xl font-bold">Bug Bounty Programs</h2>
            <p className="paragraph">
              Identifying vulnerabilities requires diverse skills often not available in-house. Crowdsourcing offers a
              highly effective solution, and the Cyberbay Platform connects you with pre-vetted bug hunters who provide
              specialized expertise when you need it.
            </p>
          </div>
          <div className="relative">
            <div className="flex items-stretch gap-4">
              <div className="flex w-1/2 flex-col gap-4">
                <div className="rounded-xl bg-primary-500 p-4">
                  <div className="flex flex-col items-center text-neutral-50">
                    <div className="paragraph-sm">Bug Bounty</div>
                    <div className="paragraph-xxl font-semibold">Programs</div>
                  </div>
                  <Image
                    src="/platform/bug-bounty-programs-window.png"
                    alt="Bug Bounty Programs"
                    width={600}
                    height={400}
                    className="-mb-4 rounded-lg shadow-lg"
                  />
                </div>
                <div className="flex flex-col gap-6 rounded-xl bg-primary-800 p-10 text-neutral-50">
                  <div className="flex flex-row items-center gap-4">
                    <Image
                      src="/platform/matters.svg"
                      alt="Bug Bounty Programs"
                      width={60}
                      height={60}
                      className="-mb-4 rounded-lg shadow-lg"
                    />
                    <h3 className="heading-7 font-bold">Why This Matters</h3>
                  </div>
                  <p className="paragraph-md">
                    Crowdsourcing your bug bounty programs provides cost-effective, on-demand scalability and a wider
                    talent pool to strengthen your defenses against cyber attacks.
                  </p>
                </div>
              </div>
              <div className="flex w-1/2 flex-col gap-4">
                <div className="flex flex-col gap-6 rounded-xl bg-primary-800 p-10 text-neutral-50">
                  <div className="flex flex-row items-center gap-4">
                    <Image
                      src="/platform/program.svg"
                      alt="Bug Bounty Programs"
                      width={60}
                      height={60}
                      className="-mb-4 rounded-lg shadow-lg"
                    />
                    <h3 className="heading-7 font-bold">Public vs. Private Programs</h3>
                  </div>
                  <p className="paragraph-md">
                    Public programs are open to all Cyberbay bug hunters, while private programs are invitation-only.
                    Contact us to discuss which type of program is best for you.
                  </p>
                </div>
                <div className="flex items-end justify-end overflow-hidden rounded-xl bg-primary-500 pl-16 pt-4">
                  <Image
                    src={missionsWindow}
                    alt="Missions"
                    sizes="100vw"
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
