import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

import Logo from "assets/images/cyberbay-logo.svg";
import ChevronDown from "assets/images/chevron-down.svg";

import EN from "assets/images/languages/en.svg";
import ES from "assets/images/languages/es.svg";
import CN from "assets/images/languages/cn.svg";

import BuildingOffice from "assets/images/solutions/building-office.svg";
import ClipboardDocumentCheck from "assets/images/solutions/clipboard-document-check.svg";
import Eye from "assets/images/solutions/eye.svg";
import MagnifyingGlass from "assets/images/solutions/magnifying-glass.svg";
import RocketLaunch from "assets/images/solutions/rocket-launch.svg";
import ShieldCheck from "assets/images/solutions/shield-check.svg";
import ViewfinderDot from "assets/images/solutions/viewfinder-dot.svg";
import Link from "next/link";

interface NavProps {
  isAuthenticated?: boolean;
  onSignOut?: () => void;
}

export const Nav: React.FC<NavProps> = ({
  isAuthenticated = false,
  onSignOut,
}) => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSolutionsDropdown, setShowSolutionsDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState({
    code: "en",
    name: "EN",
    flag: EN,
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
    const handleRouteChange = () => {
      setIsMobileMenuOpen(false);
      setShowSolutionsDropdown(false);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [router]);

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
    <nav className="fixed top-0 left-0 right-0 w-[95%] h-[72px] mt-[40px] mx-auto bg-neutral-50 z-[9999] shadow-sm rounded-lg">
      <div className="max-w-[1440px] mx-auto px-[20px] h-full flex items-center justify-between">
        <div className="flex items-center gap-[34px]">
          <Link href="/">
            <img src={Logo.src} alt="Cyberbay" />
          </Link>
          <div className="hidden md:flex items-center gap-3">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.hasDropdown ? (
                  <button
                    ref={buttonRef}
                    className={`flex items-center group font-medium text-base transition-colors hover:bg-[#EFF0F2CC] rounded-lg px-3 py-2 ${
                      showSolutionsDropdown
                        ? "text-primary-500"
                        : "text-primary-800 hover:text-primary-500"
                    }`}
                    onClick={() =>
                      setShowSolutionsDropdown(!showSolutionsDropdown)
                    }
                  >
                    {item.name}
                    <span
                      className={`ml-1 inline-block transition-transform duration-200 ${showSolutionsDropdown ? "rotate-180" : ""}`}
                    >
                      <img src={ChevronDown.src} alt="Chevron Down" />
                    </span>
                  </button>
                ) : (
                  <button
                    className={`font-medium text-base group transition-colors hover:bg-[#EFF0F2CC] rounded-lg px-3 py-2 ${
                      router.pathname === item.href
                        ? "text-primary-500"
                        : "text-primary-800 hover:text-primary-500"
                    }`}
                    onClick={() => router.push(item.href)}
                  >
                    {item.name}
                  </button>
                )}

                {item.hasDropdown && showSolutionsDropdown && (
                  <div
                    ref={dropdownRef}
                    className="fixed left-1/2 -translate-x-1/2 w-[90%] bg-neutral-50 shadow-lg rounded-b-xl mt-4"
                    style={{ top: "96px" }}
                  >
                    <div className="pt-5 pb-10 px-10">
                      <div className="flex flex-row justify-between">
                        {menuData.map((section) => (
                          <div key={section.title}>
                            <h3 className="text-[16px] font-primarySemiBold text-primary-800 mb-5">
                              {section.title}
                            </h3>
                            <div className="space-y-6">
                              {section.items.map((item) => (
                                <a
                                  key={item.name}
                                  href={item.href}
                                  className="block group"
                                >
                                  <div className="flex items-start gap-2">
                                    <span className="text-2xl">
                                      <img
                                        src={item.icon.src}
                                        alt={item.name}
                                      />
                                    </span>
                                    <div>
                                      <div className="text-[15px] text-primary-500 font-medium mb-1">
                                        {item.name}
                                      </div>
                                      <p className="text-[13px] text-neutral-500 leading-snug">
                                        {item.description}
                                      </p>
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

        <div className="hidden md:flex items-center gap-3">
          <div className="relative">
            <button
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#EFF0F2CC] transition-colors"
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
            >
              <img
                src={selectedLanguage.flag.src}
                alt={selectedLanguage.name}
              />
              <span className="text-primary-800">{selectedLanguage.name}</span>
              <span
                className={`transition-transform duration-200 ${showLanguageDropdown ? "rotate-180" : ""}`}
              >
                <img src={ChevronDown.src} alt="Chevron Down" />
              </span>
            </button>

            {showLanguageDropdown && (
              <div className="absolute top-full right-0 mt-2 bg-neutral-50 rounded-lg shadow-lg py-2 min-w-[120px]">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className="w-full flex items-center gap-2 px-4 py-2 hover:bg-[#EFF0F2CC] transition-colors"
                    onClick={() => {
                      setSelectedLanguage(lang);
                      setShowLanguageDropdown(false);
                    }}
                  >
                    <img src={lang.flag.src} alt={lang.name} />
                    <span className="text-primary-800">{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <a
            href="/login"
            className="text-primary-500 hover:text-blue-700 rounded-lg px-4 py-2 border border-[#045DE3] font-medium text-base"
          >
            Log In / Sign Up
          </a>

          <a
            href="/contact"
            className="bg-primary-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-base transition-colors"
          >
            Contact Us
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-primary-800"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          ---
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-[72px] left-0 right-0 bg-neutral-50 shadow-lg md:hidden">
            <div className="flex flex-col p-4">
              {navItems.map((item) => (
                <div key={item.name}>
                  <button
                    className={`w-full text-left py-2 px-4 font-medium text-base ${
                      router.pathname === item.href
                        ? "text-primary-500"
                        : "text-primary-800"
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
                            <div className="text-sm font-semibold text-gray-500 px-4 py-2">
                              {section.title}
                            </div>
                            {section.items.map((item) => (
                              <a
                                key={item.name}
                                href={item.href}
                                className="block px-4 py-2"
                              >
                                <div className="flex items-start">
                                  <span className="text-xl mr-3">
                                    <img src={item.icon.src} alt={item.name} />
                                  </span>
                                  <div>
                                    <div className="text-primary-800">
                                      {item.name}
                                    </div>
                                    <p className="text-sm text-gray-500">
                                      {item.description}
                                    </p>
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
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#EFF0F2CC] transition-colors"
                  onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                >
                  <img
                    src={selectedLanguage.flag.src}
                    alt={selectedLanguage.name}
                  />
                  <span className="text-primary-800">
                    {selectedLanguage.name}
                  </span>
                  <span
                    className={`transition-transform duration-200 ${showLanguageDropdown ? "rotate-180" : ""}`}
                  >
                    <img src={ChevronDown.src} alt="Chevron Down" />
                  </span>
                </button>

                {showLanguageDropdown && (
                  <div className="absolute top-full right-0 mt-2 bg-neutral-50 rounded-lg shadow-lg py-2 min-w-[120px]">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        className="w-full flex items-center gap-2 px-4 py-2 hover:bg-[#EFF0F2CC] transition-colors"
                        onClick={() => {
                          setSelectedLanguage(lang);
                          setShowLanguageDropdown(false);
                        }}
                      >
                        <img src={lang.flag.src} alt={lang.name} />
                        <span className="text-primary-800">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {isAuthenticated ? (
                <button
                  onClick={onSignOut}
                  className="py-2 px-4 text-primary-500  font-medium text-base text-left"
                >
                  Sign Out
                </button>
              ) : (
                <a
                  href="/login"
                  className="py-2 px-4 text-primary-500 font-medium text-base"
                >
                  Log In / Sign Up
                </a>
              )}
              <a
                href="/contact"
                className="mt-2 mx-4 bg-primary-500 text-white py-2 px-4 rounded-lg font-medium text-base text-center"
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
