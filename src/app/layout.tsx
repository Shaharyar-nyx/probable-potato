import React, { JSX } from "react";

import CookieConsent from "@/components/CookieConsent";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { SiteContextProvider } from "@/context";
import { getFooterMenusDirectus, getMainMenusDirectus } from "@/lib/menus";

import "vanilla-cookieconsent/dist/cookieconsent.css";
import "@/styles/globals.css";

export const metadata = {
  title: "Your App Title",
  description: "Your App Description",
};

const RootLayout = async ({ children }: { children: React.ReactNode }): Promise<JSX.Element> => {
  const { mainNav } = await getMainMenusDirectus();
  const { footerNav } = await getFooterMenusDirectus();

  return (
    <html lang="en">
      <body>
        <Nav />
        <SiteContextProvider footerNav={footerNav} mainNav={mainNav}>
          {children}
          <CookieConsent />
        </SiteContextProvider>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
