const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

export default function BugBountyPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#EEF6FF] to-white pb-16 pt-24">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold text-[#1E2B3A]">
            Scale Your Security with the Power of Crowdsourcing
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-[#4B5563]">
            Our platform connects you with skilled security researchers worldwide to identify vulnerabilities before
            malicious actors do
          </p>
          <button className="rounded-lg bg-[#2563EB] px-8 py-3 text-white hover:bg-[#1D4ED8]">
            Sign Up Now
          </button>
        </div>
      </section>

      {/* Finding Bugs Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-[#1E2B3A]">
            Finding bugs is harder than fixing them
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl bg-[#2563EB] p-8 text-white">
              <h3 className="mb-4 text-xl font-semibold">Why We Do This</h3>
              <p className="text-[#F3F4F6]">
                Security vulnerabilities can exist in any application. Our platform helps you find and fix them before
                they become a problem.
              </p>
            </div>
            <div className="rounded-xl bg-[#2563EB] p-8 text-white">
              <h3 className="mb-4 text-xl font-semibold">Built by Hackers</h3>
              <p className="text-[#F3F4F6]">
                Our community of ethical hackers brings diverse perspectives and expertise to identify vulnerabilities
                others might miss.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Program Types Section */}
      <section className="bg-[#F8FAFC] py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-[#1E2B3A]">
            Which Program Type is Right for You?
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl bg-white p-8 shadow">
              <h3 className="mb-4 text-xl font-semibold text-[#1E2B3A]">Public Bug Bounty Program</h3>
              <p className="text-[#4B5563]">
                Open to our entire community of researchers, maximizing the diversity of skills and perspectives.
              </p>
            </div>
            <div className="rounded-xl bg-white p-8 shadow">
              <h3 className="mb-4 text-xl font-semibold text-[#1E2B3A]">Private Bug Bounty Program</h3>
              <p className="text-[#4B5563]">
                Invitation-only programs with selected researchers for more sensitive applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Program Safeguards */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-[#1E2B3A]">
            Peace of Mind with CyberBay's Program Safeguards
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Background Checks",
                description: "Thorough vetting of all participating researchers",
              },
              {
                title: "Sign-In Verification",
                description: "Secure authentication for all program participants",
              },
              {
                title: "Sandbox Environment",
                description: "Safe testing environment for vulnerability discovery",
              },
              {
                title: "Safety Kill Switch",
                description: "Immediate program pause capability if needed",
              },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="mb-4 text-[#2563EB]">
                  <CheckIcon />
                </div>
                <h3 className="mb-2 font-semibold text-[#1E2B3A]">{item.title}</h3>
                <p className="text-[#4B5563]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="bg-[#F8FAFC] py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-[#1E2B3A]">Cyberbay Packages</h2>
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            <div className="rounded-xl bg-white p-8 shadow">
              <h3 className="mb-2 text-xl font-semibold text-[#1E2B3A]">Standard</h3>
              <div className="mb-6 text-3xl font-bold text-[#1E2B3A]">$10,000</div>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="mr-3 text-[#2563EB]"><CheckIcon /></span>
                  <span className="text-[#4B5563]">Public Program</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-3 text-[#2563EB]"><CheckIcon /></span>
                  <span className="text-[#4B5563]">Basic Triage</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-3 text-[#2563EB]"><CheckIcon /></span>
                  <span className="text-[#4B5563]">Community Access</span>
                </li>
              </ul>
              <button className="mt-8 w-full rounded-lg bg-[#2563EB] py-3 text-white hover:bg-[#1D4ED8]">
                Get Started
              </button>
            </div>
            <div className="rounded-xl bg-white p-8 shadow">
              <h3 className="mb-2 text-xl font-semibold text-[#1E2B3A]">Enterprise</h3>
              <div className="mb-6 text-3xl font-bold text-[#1E2B3A]">Get a Quote</div>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="mr-3 text-[#2563EB]"><CheckIcon /></span>
                  <span className="text-[#4B5563]">Private Program</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-3 text-[#2563EB]"><CheckIcon /></span>
                  <span className="text-[#4B5563]">Advanced Triage</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-3 text-[#2563EB]"><CheckIcon /></span>
                  <span className="text-[#4B5563]">Dedicated Support</span>
                </li>
              </ul>
              <button className="mt-8 w-full rounded-lg border-2 border-[#2563EB] py-3 text-[#2563EB] hover:bg-[#EEF6FF]">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
