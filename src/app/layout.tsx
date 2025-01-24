import { Poppins } from "next/font/google";

import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import ReCaptchaProvider from "@/components/ReCaptchaProvider";
import { SiteContextProvider } from "@/context";
import { getFooterMenusStrapi, getMainMenusStrapi } from "@/lib/menus";

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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { mainNav } = await getMainMenusStrapi();
  const { footerNav } = await getFooterMenusStrapi();

  return (
    <html className={poppins.className} lang="en">
      <body>
        <ReCaptchaProvider>
          <Nav {...mainNav} />
          <SiteContextProvider footerNav={footerNav} mainNav={mainNav}>
            {children}
          </SiteContextProvider>
          <Footer {...footerNav} />
        </ReCaptchaProvider>
      </body>
    </html>
  );
}
