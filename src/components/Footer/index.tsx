import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { JSX } from "react";

import Logo from "assets/images/cyberbay-white.svg";

interface NavItem {
  href: string;
  label: string;
}

interface NavSection {
  links: NavItem[];
  title: string;
}

interface SocialLink {
  href: string;
  icon: JSX.Element;
  platform: string;
}

const navigationData: NavSection[] = [
  {
    title: "Solutions",
    links: [
      { label: "Cyberbay Platform", href: "/cyberbay-platform" },
      { label: "Bug Bounty", href: "/bug-bounty" },
      { label: "Continuous Monitoring", href: "/continuous-monitoring" },
      { label: "Vendor Risk Management", href: "/vendor-risk-management" },
      {
        label: "Regulatory and Compliance Certifications",
        href: "/regulatory-compliance",
      },
    ],
  },
  {
    title: "Partners",
    links: [
      { label: "Partners Program", href: "/partners-program" },
      { label: "Partners Directory", href: "/partners-directory" },
    ],
  },
  {
    title: "Knowledge Base",
    links: [
      { label: "Consumer Resources", href: "/consumer-resources" },
      { label: "Ethical Hackers Resources", href: "/ethical-hackers" },
      { label: "Events", href: "/events" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Careers", href: "/careers" },
      { label: "Academy", href: "/academy" },
      { label: "Press", href: "/press" },
      { label: "Media Kit", href: "/media-kit" },
    ],
  },
];

const legalLinks: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Cookies Settings", href: "/cookies-settings" },
];

const socialLinks: SocialLink[] = [
  {
    platform: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg fill="currentColor" height="24" viewBox="0 0 24 24" width="24">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    ),
  },
  {
    platform: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg fill="currentColor" height="24" viewBox="0 0 24 24" width="24">
        <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 1 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
      </svg>
    ),
  },
  {
    platform: "Twitter",
    href: "https://twitter.com",
    icon: (
      <svg fill="currentColor" height="24" viewBox="0 0 24 24" width="24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    platform: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg fill="currentColor" height="24" viewBox="0 0 24 24" width="24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    platform: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg fill="currentColor" height="24" viewBox="0 0 24 24" width="24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#00205B] text-white">
      <div className="mx-auto max-w-[1440px] px-16 py-20">
        <div className="flex flex-col space-y-8">
          {/* Main Content */}
          <div className="flex flex-col justify-between gap-16 lg:flex-row">
            {/* Left Side - Logo and Navigation */}
            <div className="flex flex-col gap-16 lg:flex-row">
              <div className="flex-shrink-0">
                <Link className="block w-[140px]" href="/">
                  <Image alt="Cyberbay" height={24} src={Logo} width={140} />
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-x-5 gap-y-12 md:grid-cols-4">
                {navigationData.map((section) => (
                  <div key={section.title}>
                    <h3 className="mb-6 font-primaryBold text-base">{section.title}</h3>
                    <ul className="space-y-4 text-[14px]">
                      {section.links.map((link) => (
                        <li key={link.href}>
                          <Link className="transition-colors hover:text-gray-300" href={link.href}>
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Stay Connected */}
            <div className="flex-shrink-0 lg:w-[360px]">
              <h3 className="mb-4 font-primaryBold text-base">Stay Connected</h3>
              <p className="mb-6 text-[14px]">
                Get the latest cybersecurity insights and updates. You can unsubscribe at any time.
              </p>
              <div className="flex flex-col gap-3">
                <input
                  className="w-full border-b border-primary-500 bg-transparent px-1 py-2 text-[14px] text-white placeholder-[#EFF0F2B2] focus:outline-none"
                  placeholder="Enter your email address"
                  type="email"
                />
                <button className="w-full rounded bg-primary-500 px-8 py-3 text-[14px] font-medium text-white transition-colors hover:bg-[#1E90FF]/90">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-neutral-200 pt-8">
            <div className="flex flex-col items-center justify-between md:flex-row">
              <div className="flex items-center space-x-6 text-[14px] text-neutral-200">
                {legalLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="text-[14px] text-neutral-200">© {moment().year()} Cyberbay.</div>
              <div className="flex items-center space-x-4">
                {socialLinks.map((social) => (
                  <Link
                    key={social.platform}
                    aria-label={social.platform}
                    className="text-neutral-200 hover:text-white"
                    href={social.href}
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
