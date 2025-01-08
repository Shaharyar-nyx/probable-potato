"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

import { Button, IconRenderer } from "@/components";

export const Nav: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSolutionsDropdown, setShowSolutionsDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState({
    code: "en",
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
        // setShowSolutionsDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    // setShowSolutionsDropdown(false);
  }, [pathname]);

  const services = [
    {
      name: "Platform",
      href: "/solutions/platform",
      description: "Connect to vetted researchers, manage programs, and reporting",
      icon: "WindowIcon",
    },
    {
      name: "Continuous Monitoring",
      href: "/solutions/continuous-monitoring",
      description: "24/7 Monitoring for Instant Threat Detection",
      icon: "EyeIcon",
    },
    {
      name: "Bug Bounty Programs",
      href: "/solutions/bug-bounty",
      description: "Crowdsourced Security at Your Fingertips.",
      icon: "ViewfinderCircleIcon",
    },
  ];

  const industries = [
    {
      name: "For Organizations",
      href: "/solutions/organizations",
      description: "Tailored solutions for your industry's needs",
      icon: "BuildingOfficeIcon",
    },
    {
      name: "For X (will replace by industry)",
      href: "/solutions/industry",
      description: "Protect your clients data, etc. (will replace by industry)",
      icon: "RocketLaunchIcon",
    },
  ];

  const partners = [
    {
      name: "Partner Program",
      href: "/partners/program",
      description: "Join Our Network of World-Class Service Providers",
      icon: "EyeIcon",
    },
    {
      name: "Partner Directory",
      href: "/partners/directory",
      description: "Find a Partner",
      icon: "MagnifyingGlassIcon",
    },
  ];

  const languages = [
    { code: "en", name: "EN" },
    { code: "es", name: "ES" },
    { code: "zh", name: "CN" },
  ];

  const navItems = [
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
      name: "Bug Hunters",
      href: "/bug-hunters",
    },
    {
      name: "Company",
      href: "/company",
    },
  ];

  const menuData = [
    {
      title: "Services",
      items: services,
    },
    // {
    //   title: "Explore Strategies by Industry",
    //   items: industries,
    // },
    // {
    //   title: "Partners",
    //   items: partners,
    // },
  ];

  return (
    <nav className="fixed left-0 right-0 top-8 z-[9999] mx-auto h-[60px] w-full max-w-screen-2xl px-4">
      <div
        className={`relative mx-auto flex h-full items-center justify-between bg-neutral-50 px-4 shadow-lg ${
          showSolutionsDropdown ? "rounded-t-lg" : "rounded-lg"
        }`}
      >
        <div className="flex items-center gap-8">
          <Link href="/">
            <img alt="Cyberbay" src="/images/cyberbay-logo.svg" />
          </Link>
          <div className="hidden items-center gap-3 lg:flex">
            {navItems.map((item) => (
              <div key={item.name}>
                {item.hasDropdown ? (
                  <button
                    ref={buttonRef}
                    className={`group flex items-center rounded-lg px-3 py-2 text-base transition-colors hover:bg-[#EFF0F2CC] ${
                      showSolutionsDropdown ? "text-primary-500" : "text-primary-800 hover:text-primary-500"
                    }`}
                    onClick={() => setShowSolutionsDropdown(!showSolutionsDropdown)}
                  >
                    {item.name}
                    <span
                      className={`ml-1 inline-block transition-transform duration-200 ${showSolutionsDropdown ? "rotate-180" : ""}`}
                    >
                      <img alt="Chevron Down" src="/images/chevron-down.svg" />
                    </span>
                  </button>
                ) : (
                  <Link
                    className={`group rounded-lg px-3 py-2 text-base transition-colors hover:bg-[#EFF0F2CC] ${
                      pathname === item.href ? "text-primary-500" : "text-primary-800 hover:text-primary-500"
                    }`}
                    href={item.href}
                  >
                    {item.name}
                  </Link>
                )}

                {item.hasDropdown && showSolutionsDropdown && (
                  <div
                    ref={dropdownRef}
                    className="absolute left-0 top-[60px] w-full rounded-b-xl bg-neutral-50 shadow-lg"
                  >
                    <div className="px-10 pb-10 pt-5">
                      <div className="grid grid-cols-3 gap-[44px]">
                        {menuData.map((section) => (
                          <div key={section.title} className="w-full">
                            <h3 className="paragraph-md mb-5 font-semibold text-primary-800">{section.title}</h3>
                            <div className="space-y-6">
                              {section.items.map((item) => (
                                <Link
                                  key={item.name}
                                  className="group block rounded-[8px] p-4 hover:bg-primary-500"
                                  href={item.href}
                                  onClick={() => setShowSolutionsDropdown(false)}
                                >
                                  <div className="flex items-start gap-2">
                                    <span className="rounded-[4px] p-1 text-2xl group-hover:bg-neutral-50">
                                      <IconRenderer
                                        className="text-primary-80 h-[20px] w-[20px]"
                                        iconName={item.icon}
                                      />
                                    </span>
                                    <div className="w-full">
                                      <div className="paragraph-md mb-1 text-primary-800 group-hover:text-neutral-50">
                                        {item.name}
                                      </div>
                                      <p className="paragraph-sm text-neutral-800 group-hover:text-neutral-50">
                                        {item.description}
                                      </p>
                                    </div>
                                  </div>
                                </Link>
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

        <div className="hidden items-center gap-3 lg:flex">
          {/* <div className="relative">
            <button
              className="flex items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-[#EFF0F2CC]"
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
            >
              <span className="text-primary-800">{selectedLanguage.name}</span>
              <span className={`transition-transform duration-200 ${showLanguageDropdown ? "rotate-180" : ""}`}>
                <img alt="Chevron Down" src="/images/chevron-down.svg" />
              </span>
            </button>

            {showLanguageDropdown && (
              <div className="absolute right-0 top-full mt-2 w-full min-w-[120px] rounded-lg bg-neutral-50 py-2 shadow-lg">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className="flex w-full items-center gap-2 px-4 py-2 transition-colors hover:bg-[#EFF0F2CC]"
                    onClick={() => {
                      setSelectedLanguage(lang);
                      setShowLanguageDropdown(false);
                    }}
                  >
                    <span className="text-primary-800">{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div> */}

          <Button href="/login" transparent>
            Log In / Sign Up
          </Button>

          <Button href="/contact-us">Contact Us</Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="flex items-center justify-center rounded-lg p-2 text-primary-800 hover:bg-[#EFF0F2CC] lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? (
            <IconRenderer iconName="XMarkIcon" className="h-6 w-6" />
          ) : (
            <IconRenderer iconName="Bars3Icon" className="h-6 w-6" />
          )}
        </button>

        {/* Mobile Menu */}
        <div
          className={`absolute left-0 right-0  top-[55px] lg:top-[72px] bg-neutral-50 shadow-lg overflow-y-scroll transition-all duration-300 ease-in-out lg:hidden ${
            isMobileMenuOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
          }`}
        >
          <div className="flex flex-col space-y-2 p-4">
            {navItems.map((item) => (
              <div key={item.name} className="w-full">
                {item.hasDropdown ? (
                  <button
                    className={`w-full rounded-lg px-4 py-3 text-left text-base font-medium transition-colors hover:bg-[#EFF0F2CC] ${
                      pathname === item.href ? "bg-primary-50 text-primary-500" : "text-primary-800"
                    }`}
                    onClick={() => {
                      setShowSolutionsDropdown(!showSolutionsDropdown);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span>{item.name}</span>
                      {item.hasDropdown && (
                        <IconRenderer
                          iconName="ChevronDownIcon"
                          className={`h-5 w-5 transition-transform duration-200 ${showSolutionsDropdown ? "rotate-180" : ""}`}
                        />
                      )}
                    </div>
                  </button>
                ) : (
                  <div className="w-full px-4 py-3 text-left transition-colors">
                    <Link href={item.href} className={`text-base font-medium text-primary-800`}>
                      {item.name}
                    </Link>
                  </div>
                )}

                {item.hasDropdown && showSolutionsDropdown && (
                  <div className="mt-2 space-y-2 pl-4">
                    {menuData.map((section) => (
                      <div key={section.title} className="py-4">
                        <div className="mb-3 text-sm font-semibold text-primary-800">{section.title}</div>
                        <div className="space-y-3">
                          {section.items.map((menuItem) => (
                            <Link
                              key={menuItem.name}
                              href={menuItem.href}
                              className="group flex items-start space-x-3 rounded-lg p-2 transition-colors hover:bg-primary-500 group-hover:text-neutral-50"
                            >
                              <span className="flex-shrink-0 rounded-md bg-primary-50 p-1">
                                <IconRenderer iconName={menuItem.icon} className="h-5 w-5 text-primary-500" />
                              </span>
                              <div>
                                <div className="text-sm font-medium text-primary-800 group-hover:text-neutral-50">
                                  {menuItem.name}
                                </div>
                                <p className="text-xs text-neutral-600 group-hover:text-neutral-50">{menuItem.description}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <hr className="my-4 border-neutral-200" />

            {/* <div className="relative">
              <button
                className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-base font-medium transition-colors hover:bg-[#EFF0F2CC]"
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              >
                <span className="text-primary-800">{selectedLanguage.name}</span>
                <IconRenderer
                  iconName="ChevronDownIcon"
                  className={`h-5 w-5 transition-transform duration-200 ${showLanguageDropdown ? "rotate-180" : ""}`}
                />
              </button>

              {showLanguageDropdown && (
                <div className="absolute right-0 top-full mt-2 w-full rounded-lg bg-neutral-50 py-2 shadow-lg">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className="flex w-full items-center px-4 py-2 text-base transition-colors hover:bg-[#EFF0F2CC]"
                      onClick={() => {
                        setSelectedLanguage(lang);
                        setShowLanguageDropdown(false);
                      }}
                    >
                      <span className="text-primary-800">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div> */}

            <div className="flex flex-col space-y-3 pt-4">
              <Button href="/login" transparent onClick={() => setIsMobileMenuOpen(false)}>
                Log In / Sign Up
              </Button>

              <Button href="/contact-us" onClick={() => setIsMobileMenuOpen(false)}>
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
