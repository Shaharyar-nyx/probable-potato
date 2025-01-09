import { Poppins } from "next/font/google";
import React, { JSX } from "react";

import CookieConsent from "@/components/CookieConsent";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { SiteContextProvider } from "@/context";
import { getFooterMenusDirectus, getMainMenusDirectus } from "@/lib/menus";

import "vanilla-cookieconsent/dist/cookieconsent.css";
import "@/styles/globals.scss";

export const metadata = {
  title: "Cyberbay",
  description: "Your App Description",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

const RootLayout = async ({ children }: { children: React.ReactNode }): Promise<JSX.Element> => {
  // const { mainNav } = await getMainMenusDirectus();
  // const { footerNav } = await getFooterMenusDirectus();

  return (
    <html className={poppins.className} lang="en">
      <body>
        <Nav />
        {/* <SiteContextProvider footerNav={footerNav} mainNav={mainNav}> */}
        {children}
        {/* <CookieConsent /> */}
        {/* </SiteContextProvider> */}
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
