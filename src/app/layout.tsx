import { Inter, Poppins } from "next/font/google";
import Script from "next/script";

import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import ReCaptchaProvider from "@/components/ReCaptchaProvider";
import { SiteContextProvider } from "@/context";
import { getFooterMenusStrapi, getMainMenusStrapi } from "@/lib/menus";

import "vanilla-cookieconsent/dist/cookieconsent.css";
import "@/styles/globals.scss";

import CookieConsent from "components/CookieConsent";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

const GTM_ID = "GTM-MWRGJ3KN";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { mainNav } = await getMainMenusStrapi();
  const { footerNav } = await getFooterMenusStrapi();

  return (
    <html className={`${poppins.variable} ${inter.variable}`} lang="en">
      
      <body>
        
        {/* --- GTM noscript (place immediately after <body>) --- */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* --- GTM head snippet (via next/script) --- */}
        <Script id="gtm" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>

        <ReCaptchaProvider>
          <Nav {...mainNav} />
          <SiteContextProvider footerNav={footerNav} mainNav={mainNav}>
            {children}
          </SiteContextProvider>
          <Footer {...footerNav} />

          <CookieConsent />
        </ReCaptchaProvider>
      </body>
    </html>
  );
}
