"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

interface NavProps {
  isAuthenticated?: boolean;
  onSignOut?: () => void;
}

interface DropdownState {
  id: string;
  isOpen: boolean;
}

interface NavItem {
  name: string;
  href: string;
  hasDropdown?: boolean;
  dropdownId?: string;
}

interface MenuItem {
  name: string;
  href: string;
  description?: string;
  icon?: string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

interface DropdownContent {
  type: "grid" | "list" | "simple";
  sections?: MenuSection[];
  items?: MenuItem[];
}

interface DropdownConfig {
  id: string;
  content: DropdownContent;
}

export const Nav: React.FC<NavProps> = ({ isAuthenticated = false, onSignOut }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dropdowns, setDropdowns] = useState<DropdownState[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState({
    code: "en",
    flag: "/images/languages/en.svg",
    name: "EN",
  });
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const setButtonRef = (id: string) => (el: HTMLButtonElement | null) => {
    buttonRefs.current[id] = el;
  };

  const setDropdownRef = (id: string) => (el: HTMLDivElement | null) => {
    dropdownRefs.current[id] = el;
  };

  const handleDropdownToggle = (id: string, isOpen: boolean) => {
    setDropdowns((prev) => {
      const existing = prev.find((d) => d.id === id);
      if (existing) {
        return prev.map((d) => (d.id === id ? { ...d, isOpen } : d));
      }
      return [...prev, { id, isOpen }];
    });
  };

  const isDropdownOpen = (id: string) => dropdowns.find((d) => d.id === id)?.isOpen || false;

  const handleNavItemHover = (dropdownId: string) => {
    setDropdowns((prev) => {
      const updated = prev.map((d) => ({
        ...d,
        isOpen: d.id === dropdownId,
      }));

      const existing = updated.find((d) => d.id === dropdownId);
      if (!existing) {
        updated.push({ id: dropdownId, isOpen: true });
      }

      return updated;
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      Object.entries(dropdownRefs.current).forEach(([id, ref]) => {
        const buttonRef = buttonRefs.current[id];
        if (ref && !ref.contains(event.target as Node) && buttonRef && !buttonRef.contains(event.target as Node)) {
          handleDropdownToggle(id, false);
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setDropdowns([]);
  }, [pathname]);

  const services = [
    {
      name: "Platform",
      href: "/solutions/platform",
      description: "Connect to vetted researchers, manage programs, and reporting",
      icon: "/images/solutions/eye.svg",
    },
    {
      name: "Continuous Monitoring",
      href: "/solutions/continuous-monitoring",
      description: "24/7 Monitoring for Instant Threat Detection",
      icon: "/images/solutions/eye.svg",
    },
    {
      name: "Bug Bounty Programs",
      href: "/solutions/bug-bounty",
      description: "Crowdsourced Security at Your Fingertips.",
      icon: "/images/solutions/viewfinder-dot.svg",
    },
    // {
    //   name: "Vendor Risk Management",
    //   href: "/solutions/vendor-risk-management",
    //   description: "Crowdsourced Security at Your Fingertips.",
    //   icon: "/images/solutions/shield-check.svg",
    // },
    // {
    //   name: "Regulatory and Compliance Certifications",
    //   href: "/solutions/regulatory-compliance",
    //   description: "Advisory and assistance with SOC2 certification.",
    //   icon: "/images/solutions/clipboard-document-check.svg",
    // },
  ];

  const industries = [
    {
      name: "For Organizations",
      href: "/solutions/organizations",
      description: "Tailored solutions for your industry's needs",
      icon: "/images/solutions/building-office.svg",
    },
    {
      name: "For X (will replace by industry)",
      href: "/solutions/industry",
      description: "Protect your clients data, etc. (will replace by industry)",
      icon: "/images/solutions/rocket-launch.svg",
    },
  ];

  const partners = [
    {
      name: "Partner Program",
      href: "/partners/program",
      description: "Join Our Network of World-Class Service Providers",
      icon: "/images/solutions/eye.svg",
    },
    {
      name: "Partner Directory",
      href: "/partners/directory",
      description: "Find a Partner",
      icon: "/images/solutions/magnifying-glass.svg",
    },
  ];

  const languages = [
    { code: "en", name: "EN", flag: "/images/languages/en.svg" },
    { code: "es", name: "ES", flag: "/images/languages/es.svg" },
    { code: "zh", name: "CN", flag: "/images/languages/cn.svg" },
  ];

  const navItems: NavItem[] = [
    {
      name: "Solutions",
      href: "#",
      hasDropdown: true,
      dropdownId: "solutions",
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
      dropdownId: "company",
    },
  ];

  const dropdownConfigs: { [key: string]: DropdownContent } = {
    solutions: {
      type: "grid",
      sections: [
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
      ],
    },
  };

  const renderDropdownContent = (dropdownId: string) => {
    const config = dropdownConfigs[dropdownId];
    if (!config) return null;

    switch (config.type) {
      case "grid":
        return (
          <div className="px-10 pb-10 pt-5">
            <div className="flex flex-row justify-between">
              {config.sections?.map((section) => (
                <div key={section.title}>
                  <h3 className="mb-5 font-primarySemiBold text-[16px] text-primary-800">{section.title}</h3>
                  <div className="space-y-6">
                    {section.items.map((item) => (
                      <Link key={item.name} className="group block" href={item.href}>
                        <div className="flex items-start gap-2">
                          {item.icon && (
                            <span className="text-2xl">
                              <img alt={item.name} src={item.icon} />
                            </span>
                          )}
                          <div>
                            <div className="mb-1 text-[15px] text-primary-500">{item.name}</div>
                            {item.description && (
                              <p className="text-[13px] leading-snug text-neutral-500">{item.description}</p>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "list":
        return (
          <div className="px-6 py-4">
            <div className="grid grid-cols-1 gap-4">
              {config.items?.map((item) => (
                <Link key={item.name} href={item.href} className="group block">
                  <div className="rounded-lg p-3 transition-colors hover:bg-[#EFF0F2CC]">
                    <div className="text-base font-medium text-primary-500 group-hover:text-primary-600">
                      {item.name}
                    </div>
                    {item.description && <p className="mt-1 text-sm text-neutral-500">{item.description}</p>}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <nav
      className="fixed left-0 right-0 top-8 z-[9999] mx-auto h-[60px] w-full max-w-[1440px] px-4"
      onMouseLeave={() => handleDropdownToggle("solutions", false)}
    >
      <div
        className={`relative flex h-full items-center justify-between bg-neutral-50 px-4 shadow-sm ${
          isDropdownOpen("solutions") ? "rounded-t-lg" : "rounded-lg"
        }`}
      >
        <div className="flex items-center gap-8">
          <Link href="/">
            <img alt="Cyberbay" src="/images/cyberbay-logo.svg" />
          </Link>
          <div className="hidden items-center gap-4 md:flex">
            {navItems.map((item) => (
              <div
                key={item.name}
                onMouseEnter={() => {
                  if (item.dropdownId) {
                    handleNavItemHover(item.dropdownId);
                  } else {
                    setDropdowns((prev) => prev.map((d) => ({ ...d, isOpen: false })));
                  }
                }}
              >
                {item.hasDropdown ? (
                  <div onMouseEnter={() => handleDropdownToggle(item.dropdownId!, true)}>
                    <button
                      ref={setButtonRef(item.dropdownId!)}
                      className={`group flex items-center rounded-lg px-4 py-2 text-base transition-colors hover:bg-[#EFF0F2CC] ${
                        isDropdownOpen(item.dropdownId!)
                          ? "text-primary-500"
                          : "text-primary-800 hover:text-primary-500"
                      }`}
                    >
                      {item.name}
                      <span
                        className={`ml-1 inline-block transition-transform duration-200 ${isDropdownOpen(item.dropdownId!) ? "rotate-180" : ""}`}
                      >
                        <img alt="Chevron Down" src="/images/chevron-down.svg" />
                      </span>
                    </button>

                    <div
                      ref={setDropdownRef(item.dropdownId!)}
                      style={{ display: isDropdownOpen(item.dropdownId!) ? "block" : "none" }}
                      className="absolute left-0 right-0 top-[60px] w-full rounded-b-xl bg-neutral-50 shadow-lg"
                    >
                      {renderDropdownContent(item.dropdownId!)}
                    </div>
                  </div>
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
              </div>
            ))}
          </div>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <div className="relative">
            <div
              onMouseEnter={() => handleDropdownToggle("language", true)}
              onMouseLeave={() => handleDropdownToggle("language", false)}
            >
              <button
                ref={setButtonRef("language")}
                className="flex items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-[#EFF0F2CC]"
              >
                <img alt={selectedLanguage.name} src={selectedLanguage.flag} />
                <span className="text-primary-800">{selectedLanguage.name}</span>
                <span
                  className={`transition-transform duration-200 ${isDropdownOpen("language") ? "rotate-180" : ""}`}
                >
                  <img alt="Chevron Down" src="/images/chevron-down.svg" />
                </span>
              </button>

              {isDropdownOpen("language") && (
                <div
                  ref={setDropdownRef("language")}
                  className="absolute right-0 top-full mt-2 min-w-[120px] rounded-lg bg-neutral-50 py-2 shadow-lg"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className="flex w-full items-center gap-2 px-4 py-2 transition-colors hover:bg-[#EFF0F2CC]"
                      onClick={() => {
                        setSelectedLanguage(lang);
                        handleDropdownToggle("language", false);
                      }}
                    >
                      <img alt={lang.name} src={lang.flag} />
                      <span className="text-primary-800">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <a
            className="rounded-lg border border-primary-500 px-4 py-2 text-base text-primary-500 hover:text-blue-700"
            href="/login"
          >
            Log In / Sign Up
          </a>

          <a
            className="rounded-lg bg-primary-500 px-4 py-2 text-base text-white transition-colors hover:bg-blue-700"
            href="/contact-us"
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
                    className={`w-full px-4 py-2 text-left text-base ${
                      pathname === item.href ? "text-primary-500" : "text-primary-800"
                    }`}
                    onClick={() => {
                      if (item.hasDropdown) {
                        handleDropdownToggle(item.dropdownId!, !isDropdownOpen(item.dropdownId!));
                      } else {
                        router.push(item.href);
                        setIsMobileMenuOpen(false);
                      }
                    }}
                  >
                    {item.name}
                    {item.hasDropdown && <span className="ml-1">▾</span>}
                  </button>

                  {item.hasDropdown && isDropdownOpen(item.dropdownId!) && (
                    <div className="pl-4">
                      <div className="py-2">{renderDropdownContent(item.dropdownId!)}</div>
                    </div>
                  )}
                </div>
              ))}

              <hr className="my-2" />
              <div className="relative">
                <div
                  onMouseEnter={() => handleDropdownToggle("language", true)}
                  onMouseLeave={() => handleDropdownToggle("language", false)}
                >
                  <button
                    ref={setButtonRef("language")}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-[#EFF0F2CC]"
                  >
                    <img alt={selectedLanguage.name} src={selectedLanguage.flag} />
                    <span className="text-primary-800">{selectedLanguage.name}</span>
                    <span
                      className={`transition-transform duration-200 ${isDropdownOpen("language") ? "rotate-180" : ""}`}
                    >
                      <img alt="Chevron Down" src="/images/chevron-down.svg" />
                    </span>
                  </button>

                  {isDropdownOpen("language") && (
                    <div
                      ref={setDropdownRef("language")}
                      className="absolute right-0 top-full mt-2 min-w-[120px] rounded-lg bg-neutral-50 py-2 shadow-lg"
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          className="flex w-full items-center gap-2 px-4 py-2 transition-colors hover:bg-[#EFF0F2CC]"
                          onClick={() => {
                            setSelectedLanguage(lang);
                            handleDropdownToggle("language", false);
                          }}
                        >
                          <img alt={lang.name} src={lang.flag} />
                          <span className="text-primary-800">{lang.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {isAuthenticated ? (
                <button className="px-4 py-2 text-left text-base text-primary-500" onClick={onSignOut}>
                  Sign Out
                </button>
              ) : (
                <a className="px-4 py-2 text-base text-primary-500" href="/login">
                  Log In / Sign Up
                </a>
              )}
              <a
                className="mx-4 mt-2 rounded-lg bg-primary-500 px-4 py-2 text-center text-base text-white"
                href="/contact-us"
              >
                Contact Us
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
