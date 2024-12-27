"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

import ChevronDown from "assets/images/chevron-down.svg";
import Logo from "assets/images/cyberbay-logo.svg";
import CN from "assets/images/languages/cn.svg";
import EN from "assets/images/languages/en.svg";
import ES from "assets/images/languages/es.svg";
import BuildingOffice from "assets/images/solutions/building-office.svg";
import ClipboardDocumentCheck from "assets/images/solutions/clipboard-document-check.svg";
import Eye from "assets/images/solutions/eye.svg";
import MagnifyingGlass from "assets/images/solutions/magnifying-glass.svg";
import RocketLaunch from "assets/images/solutions/rocket-launch.svg";
import ShieldCheck from "assets/images/solutions/shield-check.svg";
import ViewfinderDot from "assets/images/solutions/viewfinder-dot.svg";

interface NavProps {
  isAuthenticated?: boolean;
  onSignOut?: () => void;
}

export const Nav: React.FC<NavProps> = ({ isAuthenticated = false, onSignOut }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSolutionsDropdown, setShowSolutionsDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState({
    code: "en",
    flag: EN,
    name: "EN",
  });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowSolutionsDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setShowSolutionsDropdown(false);
  }, [pathname]);

  const services = [
    {
      name: "Continuous Monitoring",
      href: "/solutions/continuous-monitoring",
      description: "24/7 Monitoring for Instant Threat Detection",
      icon: Eye,
    },
    {
      name: "Bug Bounty Programs",
      href: "/solutions/bug-bounty",
      description: "Crowdsourced Security at Your Fingertips.",
      icon: ViewfinderDot,
    },
    {
      name: "Vendor Risk Management",
      href: "/solutions/vendor-risk",
      description: "Crowdsourced Security at Your Fingertips.",
      icon: ShieldCheck,
    },
    {
      name: "Regulatory and Compliance Certifications",
      href: "/solutions/compliance",
      description: "Advisory and assistance with SOC2 certification.",
      icon: ClipboardDocumentCheck,
    },
  ];

  const industries = [
    {
      name: "For Organizations",
      href: "/solutions/organizations",
      description: "Tailored solutions for your industry's needs",
      icon: BuildingOffice,
    },
    {
      name: "For X (will replace by industry)",
      href: "/solutions/industry-x",
      description: "Protect your clients data, etc. (will replace by industry)",
      icon: RocketLaunch,
    },
  ];

  const partners = [
    {
      name: "Partner Program",
      href: "/partners/program",
      description: "Join Our Network of World-Class Service Providers",
      icon: Eye,
    },
    {
      name: "Partner Directory",
      href: "/partners/directory",
      description: "Find a Partner",
      icon: MagnifyingGlass,
    },
  ];

  const navItems = [
    {
      name: "Cyberbay Platform",
      href: "/cyberbay-platform",
    },
    {
      name: "Solutions",
      href: "#",
      hasDropdown: true,
    },
    {
      name: "Pricing",
      href: "/pricing",
    },
    {
      name: "Ethical Hackers",
      href: "/ethical-hackers",
    },
    {
      name: "Company",
      href: "/company",
    },
  ];

  const languages = [
    { code: "en", name: "EN", flag: EN },
    { code: "es", name: "ES", flag: ES },
    { code: "zh", name: "CN", flag: CN },
  ];

  const menuData = [
    {
      title: "Services",
      items: services,
    },
    {
      title: "Explore Strategies by Industry",
      items: industries,
    },
    {
      title: "Partners",
      items: partners,
    },
  ];

  return (
    <nav className="fixed left-0 right-0 top-0 z-[9999] mx-auto mt-[40px] h-[72px] w-[95%] rounded-lg bg-neutral-50 shadow-sm">
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-[20px]">
        <div className="flex items-center gap-[34px]">
          <Link href="/">
            <img alt="Cyberbay" src={Logo.src} />
          </Link>
          <div className="hidden items-center gap-3 md:flex">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.hasDropdown ? (
                  <button
                    ref={buttonRef}
                    className={`group flex items-center rounded-lg px-3 py-2 text-base font-medium transition-colors hover:bg-[#EFF0F2CC] ${
                      showSolutionsDropdown ? "text-primary-500" : "text-primary-800 hover:text-primary-500"
                    }`}
                    onClick={() => setShowSolutionsDropdown(!showSolutionsDropdown)}
                  >
                    {item.name}
                    <span
                      className={`ml-1 inline-block transition-transform duration-200 ${showSolutionsDropdown ? "rotate-180" : ""}`}
                    >
                      <img alt="Chevron Down" src={ChevronDown.src} />
                    </span>
                  </button>
                ) : (
                  <button
                    className={`group rounded-lg px-3 py-2 text-base font-medium transition-colors hover:bg-[#EFF0F2CC] ${
                      pathname === item.href ? "text-primary-500" : "text-primary-800 hover:text-primary-500"
                    }`}
                    onClick={() => router.push(item.href)}
                  >
                    {item.name}
                  </button>
                )}

                {item.hasDropdown && showSolutionsDropdown && (
                  <div
                    ref={dropdownRef}
                    className="fixed left-1/2 mt-4 w-[90%] -translate-x-1/2 rounded-b-xl bg-neutral-50 shadow-lg"
                    style={{ top: "96px" }}
                  >
                    <div className="px-10 pb-10 pt-5">
                      <div className="flex flex-row justify-between">
                        {menuData.map((section) => (
                          <div key={section.title}>
                            <h3 className="mb-5 font-primarySemiBold text-[16px] text-primary-800">{section.title}</h3>
                            <div className="space-y-6">
                              {section.items.map((item) => (
                                <a key={item.name} className="group block" href={item.href}>
                                  <div className="flex items-start gap-2">
                                    <span className="text-2xl">
                                      <img alt={item.name} src={item.icon.src} />
                                    </span>
                                    <div>
                                      <div className="mb-1 text-[15px] font-medium text-primary-500">{item.name}</div>
                                      <p className="text-[13px] leading-snug text-neutral-500">{item.description}</p>
                                    </div>
                                  </div>
                                </a>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <div className="relative">
            <button
              className="flex items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-[#EFF0F2CC]"
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
            >
              <img alt={selectedLanguage.name} src={selectedLanguage.flag.src} />
              <span className="text-primary-800">{selectedLanguage.name}</span>
              <span className={`transition-transform duration-200 ${showLanguageDropdown ? "rotate-180" : ""}`}>
                <img alt="Chevron Down" src={ChevronDown.src} />
              </span>
            </button>

            {showLanguageDropdown && (
              <div className="absolute right-0 top-full mt-2 min-w-[120px] rounded-lg bg-neutral-50 py-2 shadow-lg">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className="flex w-full items-center gap-2 px-4 py-2 transition-colors hover:bg-[#EFF0F2CC]"
                    onClick={() => {
                      setSelectedLanguage(lang);
                      setShowLanguageDropdown(false);
                    }}
                  >
                    <img alt={lang.name} src={lang.flag.src} />
                    <span className="text-primary-800">{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <a
            className="rounded-lg border border-[#045DE3] px-4 py-2 text-base font-medium text-primary-500 hover:text-blue-700"
            href="/login"
          >
            Log In / Sign Up
          </a>

          <a
            className="rounded-lg bg-primary-500 px-4 py-2 text-base font-medium text-white transition-colors hover:bg-blue-700"
            href="/contact"
          >
            Contact Us
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button className="text-primary-800 md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          ---
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute left-0 right-0 top-[72px] bg-neutral-50 shadow-lg md:hidden">
            <div className="flex flex-col p-4">
              {navItems.map((item) => (
                <div key={item.name}>
                  <button
                    className={`w-full px-4 py-2 text-left text-base font-medium ${
                      pathname === item.href ? "text-primary-500" : "text-primary-800"
                    }`}
                    onClick={() => {
                      if (item.hasDropdown) {
                        setShowSolutionsDropdown(!showSolutionsDropdown);
                      } else {
                        router.push(item.href);
                        setIsMobileMenuOpen(false);
                      }
                    }}
                  >
                    {item.name}
                    {item.hasDropdown && <span className="ml-1">▾</span>}
                  </button>

                  {item.hasDropdown && showSolutionsDropdown && (
                    <div className="pl-4">
                      <div className="py-2">
                        {menuData.map((section) => (
                          <div key={section.title}>
                            <div className="px-4 py-2 text-sm font-semibold text-gray-500">{section.title}</div>
                            {section.items.map((item) => (
                              <a key={item.name} className="block px-4 py-2" href={item.href}>
                                <div className="flex items-start">
                                  <span className="mr-3 text-xl">
                                    <img alt={item.name} src={item.icon.src} />
                                  </span>
                                  <div>
                                    <div className="text-primary-800">{item.name}</div>
                                    <p className="text-sm text-gray-500">{item.description}</p>
                                  </div>
                                </div>
                              </a>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <hr className="my-2" />
              <div className="relative">
                <button
                  className="flex items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-[#EFF0F2CC]"
                  onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                >
                  <img alt={selectedLanguage.name} src={selectedLanguage.flag.src} />
                  <span className="text-primary-800">{selectedLanguage.name}</span>
                  <span className={`transition-transform duration-200 ${showLanguageDropdown ? "rotate-180" : ""}`}>
                    <img alt="Chevron Down" src={ChevronDown.src} />
                  </span>
                </button>

                {showLanguageDropdown && (
                  <div className="absolute right-0 top-full mt-2 min-w-[120px] rounded-lg bg-neutral-50 py-2 shadow-lg">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        className="flex w-full items-center gap-2 px-4 py-2 transition-colors hover:bg-[#EFF0F2CC]"
                        onClick={() => {
                          setSelectedLanguage(lang);
                          setShowLanguageDropdown(false);
                        }}
                      >
                        <img alt={lang.name} src={lang.flag.src} />
                        <span className="text-primary-800">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {isAuthenticated ? (
                <button className="px-4 py-2 text-left text-base font-medium text-primary-500" onClick={onSignOut}>
                  Sign Out
                </button>
              ) : (
                <a className="px-4 py-2 text-base font-medium text-primary-500" href="/login">
                  Log In / Sign Up
                </a>
              )}
              <a
                className="mx-4 mt-2 rounded-lg bg-primary-500 px-4 py-2 text-center text-base font-medium text-white"
                href="/contact"
              >
                Get Started
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
