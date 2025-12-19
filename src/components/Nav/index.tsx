"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

import { Button, IconRenderer } from "@/components";

import { formatBtnId, getStrapiAssetUrl } from "@/lib";
import Image from "next/image";

export const Nav: React.FC<any> = ({ company_logo, navigations, supported_languages, button_group }) => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState({
    code: "en",
    name: "EN",
  });
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const dropdownRefs = useRef<{[key: string]: HTMLDivElement | null}>({});
  const buttonRefs = useRef<{[key: string]: HTMLButtonElement | null}>({});

  // Fix hydration error
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (window.innerWidth >= 1024) {
        let shouldClose = true;
        
        Object.values(dropdownRefs.current).forEach(ref => {
          if (ref && ref.contains(event.target as Node)) {
            shouldClose = false;
          }
        });
        
        Object.values(buttonRefs.current).forEach(ref => {
          if (ref && ref.contains(event.target as Node)) {
            shouldClose = false;
          }
        });

        if (shouldClose) {
          setActiveDropdown(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const handleDropdownToggle = (title: string) => {
    setActiveDropdown(activeDropdown === title ? null : title);
  };

  // Safe data access with fallbacks
  const mainNavItems = navigations?.data?.[0]?.attributes?.items?.data?.slice(0, 4) || [];
  const logoUrl = company_logo?.data?.attributes?.url;

  // Don't render until mounted to avoid hydration mismatch
  if (!isMounted) {
    return (
      <nav className="fixed left-0 right-0 z-[9999] mx-auto h-[60px] w-full max-w-screen-2xl lg:top-4 lg:px-4">
        <div className="relative mx-auto flex h-full items-center justify-between bg-white/10 backdrop-blur-md  rounded-lg px-[29px] lg:px-4">
          <div className="flex items-center gap-8">
            <Link href="/" id={formatBtnId("logo")} className="flex items-center">
              {logoUrl && (
                <Image 
                  alt={company_logo?.data?.attributes?.alternativeText || "nyxlab"} 
                  src={getStrapiAssetUrl(logoUrl)} 
                  width={130}
                  height={40}
                  className="h-auto w-auto max-h-[40px]"
                  priority
                />
              )}
            </Link>
          </div>
          {/* Mobile Menu Button */}
          <button
            aria-label="Open menu"
            className="flex items-center justify-center rounded-lg p-2 text-white hover:bg-white/10 transition-colors lg:hidden"
          >
            <IconRenderer className="h-5 w-5 filter brightness-0 invert" iconName="Bars3Icon" />
          </button>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed left-0 right-0 z-[9999] mx-auto h-[60px] w-full max-w-screen-2xl lg:top-4 lg:px-4">
      <div className="relative mx-auto flex h-full items-center justify-between bg-white/10 backdrop-blur-md border border-white/30 rounded-lg px-[29px] lg:px-4">
        <div className="flex items-center gap-8">
          <Link href="/" id={formatBtnId("logo")} className="flex items-center">
            {logoUrl && (
              <Image 
                alt={company_logo?.data?.attributes?.alternativeText || "nyxlab"} 
                src={getStrapiAssetUrl(logoUrl)} 
                width={130}
                height={40}
                className="h-8 w-auto"
                priority
              />
            )}
          </Link>

          {/* Desktop Navigation - Only 4 items in one line */}
          <div className="hidden items-center gap-1 lg:flex">
            {mainNavItems.map(
              ({ attributes: { title, url, has_children, children } }: any) => {
                // Determine if this dropdown belongs to "About" (case-insensitive).
                const isAbout = typeof title === "string" && title.toLowerCase().includes("about");

                return (
                  <div key={title} className="relative">
                    {has_children ? (
                      <button
                        id={formatBtnId(title)}
                        ref={(el) => {
                          if (el && title) {
                            buttonRefs.current[title] = el;
                          }
                        }}
                        className={`group flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-white/15 ${
                          (pathname && title && pathname.includes(title.toLowerCase())) || activeDropdown === title 
                            ? "text-white bg-white/10" 
                            : "text-white hover:text-white"
                        }`}
                        onMouseEnter={() => setActiveDropdown(title)}
                        onMouseLeave={() => {}}
                      >
                        {title}
                        <span
                          className={`ml-2 inline-block transition-transform duration-200 ${
                            activeDropdown === title ? "rotate-180" : ""
                          }`}
                        >
                          <img 
                            alt="Chevron Down" 
                            src="/images/chevron-down.svg" 
                            className="h-3 w-3 filter brightness-0 invert" 
                            onError={(e) => {
                              // Fallback if image fails to load
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                        </span>
                      </button>
                    ) : (
                      <Link
                        id={formatBtnId(title)}
                        className={`group rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-white/15 ${
                          pathname && url && pathname.includes(url) 
                            ? "text-white bg-white/10" 
                            : "text-white hover:text-white"
                        }`}
                        href={
                          url
                            ? url.startsWith("/") 
                              ? url 
                              : `/${url}`
                            : "/"
                        }
                      >
                        {title}
                      </Link>
                    )}

                    {has_children && activeDropdown === title && children?.data && (
                      <div
                        ref={(el) => {
                          if (el && title) {
                            dropdownRefs.current[title] = el;
                          }
                        }}
                        className="absolute left-0 top-full mt-2 w-96 rounded-xl bg-gray-900/95 backdrop-blur-sm border border-white/20 shadow-2xl"
                        onMouseEnter={() => setActiveDropdown(title)}
                        onMouseLeave={() => setActiveDropdown(null)}
                      >
                        <div className="p-6">
                          <div className="space-y-6">
                            {children.data.map(({ attributes: { title: categoryTitle, children: categoryChildren } }: any) => {
                              if (!categoryChildren?.data) return null;
                              
                              return (
                                <div key={categoryTitle} className="w-full">
                                  <h3 className="mb-4 font-bold text-white uppercase tracking-wider text-xs border-b border-white/20 pb-2">
                                    {categoryTitle}
                                  </h3>
                                  <div className="grid grid-cols-1 gap-2">
                                    {categoryChildren.data.map(({ attributes: { title: itemTitle, url: itemUrl, description } }: any) => (
                                      <Link
                                        key={itemTitle}
                                        id={formatBtnId(itemTitle)}
                                        className="group relative rounded-xl p-4 transition-all duration-200 hover:bg-white/10 border border-transparent hover:border-white/30 hover:shadow-lg overflow-hidden"
                                        href={
                                          itemUrl
                                            ? itemUrl.startsWith("/") 
                                              ? itemUrl 
                                              : `/${itemUrl}`
                                            : "/"
                                        }
                                        onClick={() => setActiveDropdown(null)}
                                        onMouseEnter={() => setHoveredItem(itemTitle)}
                                        onMouseLeave={() => setHoveredItem(null)}
                                      >
                                        {/* Main Content */}
                                        <div className="flex items-start justify-between gap-3">
                                          <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-semibold text-white group-hover:text-white leading-tight mb-1">
                                              {itemTitle}
                                            </h4>
                                            
                                            {/* Description - Shows on hover */}
                                            <div className="overflow-hidden">
                                              <p className={`text-xs text-gray-300 leading-relaxed transition-all duration-300 transform ${
                                                hoveredItem === itemTitle 
                                                  ? "opacity-100 translate-y-0 max-h-20" 
                                                  : "opacity-0 translate-y-2 max-h-0"
                                              }`}>
                                                {description || ''}
                                              </p>
                                            </div>
                                          </div>
                                          
                                          {/* Arrow Indicator - removed for 'About' dropdown */}
                                          {!isAbout && (
                                            <div className="flex-shrink-0 transition-all duration-200 group-hover:translate-x-1">
                                              <svg 
                                                className="h-4 w-4 text-white filter brightness-0 invert" 
                                                fill="none" 
                                                viewBox="0 0 24 24" 
                                                stroke="currentColor"
                                              >
                                                <path 
                                                  strokeLinecap="round" 
                                                  strokeLinejoin="round" 
                                                  strokeWidth={2} 
                                                  d="M9 5l7 7-7 7" 
                                                />
                                              </svg>
                                            </div>
                                          )}
                                        </div>

                                        {/* Hover Effect Line - removed for 'About' dropdown */}
                                        {!isAbout && (
                                          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
                                        )}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              },
            )}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="hidden items-center gap-3 lg:flex">
          {button_group?.map((data: any, index: number) => (
            <Button
              key={index}
              id={formatBtnId(data.title)}
              href={data.href || undefined}
              externalHref={data.external_href || undefined}
              variant={data.variant}
              transparent={data.transparent}
              className={`min-w-[120px] px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                data.variant === "primary" 
                  ? "bg-white text-black hover:bg-gray-100 hover:shadow-lg border border-white rounded-lg" 
                  : "bg-transparent border border-white text-white hover:bg-white/10 hover:border-white/70 rounded-lg"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {data.title}
            </Button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          className="flex items-center justify-center rounded-lg p-2 text-white hover:bg-white/10 transition-colors lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <IconRenderer className="h-5 w-5 filter brightness-0 invert" iconName="XMarkIcon" />
          ) : (
            <IconRenderer className="h-5 w-5 filter brightness-0 invert" iconName="Bars3Icon" />
          )}
        </button>

        {/* Mobile Menu */}
        <div
          className={`absolute left-0 right-0 top-[55px] overflow-y-auto bg-black/95 backdrop-blur-md border-t border-white/30 shadow-lg transition-all duration-300 ease-in-out lg:top-[72px] lg:hidden ${
            isMobileMenuOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
          }`}
          style={{ height: "calc(100vh - 55px)" }}
        >
          <div className="flex h-full flex-col justify-between space-y-2 px-[29px] py-[18px]">
            <div>
              {mainNavItems.map(
                ({ attributes: { url, has_children, children, title, description } }: any) => (
                  <div key={title} className="w-full">
                    {has_children ? (
                      <button
                        id={formatBtnId(title)}
                        className={`w-full border-b border-white/20 px-0 pb-3 pt-4 text-left text-sm transition-colors hover:bg-white/10 rounded-lg px-3 ${
                          pathname === url ? "text-white bg-white/10" : "text-white"
                        }`}
                        onClick={() => {
                          handleDropdownToggle(title);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{title}</span>
                          {has_children && (
                            <IconRenderer
                              className={`ml-1 h-4 w-4 transition-transform duration-200 filter brightness-0 invert ${
                                activeDropdown === title ? "rotate-180" : ""
                              }`}
                              iconName="ChevronDownIcon"
                            />
                          )}
                        </div>
                      </button>
                    ) : (
                      <div className="w-full border-b border-white/20 px-0 pb-3 pt-4 text-left transition-colors hover:bg-white/10 rounded-lg px-3">
                        <Link
                          id={formatBtnId(title)}
                          className={`text-sm font-medium text-white`}
                          href={
                            url
                              ? url.startsWith("/") 
                                ? url 
                                : `/${url}`
                              : "/"
                          }
                        >
                          {title}
                        </Link>
                      </div>
                    )}

                    {has_children && activeDropdown === title && children?.data && (
                      // Determine if this is the "About" dropdown on mobile too
                      (() => {
                        const isAboutMobile = typeof title === "string" && title.toLowerCase().includes("about");
                        return (
                          <div className="mt-2 space-y-2">
                            {children.data.map(({ attributes: { title: categoryTitle, children: categoryChildren } }: any) => (
                              <div key={categoryTitle} className="py-3">
                                <div className="mb-3 text-xs font-semibold text-white/80 uppercase tracking-wide px-3">
                                  {categoryTitle}
                                </div>
                                <div className="space-y-2">
                                  {categoryChildren?.data?.map(({ attributes: { title: itemTitle, url: itemUrl, description } }: any) => (
                                    <Link
                                      key={itemTitle}
                                      id={formatBtnId(itemTitle)}
                                      className="group relative rounded-lg p-4 transition-colors hover:bg-white/10 border border-transparent hover:border-white/20 mx-2 overflow-hidden"
                                      href={
                                        itemUrl
                                          ? itemUrl.startsWith("/") 
                                            ? itemUrl 
                                            : `/${itemUrl}`
                                          : "/"
                                      }
                                      onClick={() => {
                                        setActiveDropdown(null);
                                        setIsMobileMenuOpen(false);
                                      }}
                                    >
                                      <div className="flex-1 min-w-0">
                                        <div className="text-sm font-medium text-white mb-1">{itemTitle}</div>
                                        <div className="overflow-hidden">
                                          <p className="text-xs text-gray-300 transition-all duration-300 transform group-hover:translate-y-0 group-hover:opacity-100 -translate-y-2 opacity-0">
                                            {description || ''}
                                          </p>
                                        </div>
                                      </div>
                                      {/* Mobile Hover Line - removed for About */}
                                      {!isAboutMobile && (
                                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
                                      )}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        );
                      })()
                    )}
                  </div>
                ),
              )}
            </div>

            <div className="flex flex-col gap-3 !pb-[40%]">
              {button_group?.map((data: any, index: number) => (
                <Button
                  key={index}
                  id={formatBtnId(data.title)}
                  href={data.href || undefined}
                  externalHref={data.external_href || undefined}
                  variant={data.variant}
                  transparent={data.transparent}
                  className={`w-full text-sm font-medium py-3 ${
                    data.variant === "primary" 
                      ? "bg-white text-black hover:bg-gray-100 border border-white" 
                      : "bg-transparent border border-white text-white hover:bg-white/10"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {data.title}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;