import NextApp from "next/app";

import CookieConsent from "@/components/CookieConsent";
import { SiteContext, useSiteContext } from "@/hooks/use-site";
import "@/styles/globals.css";
import "vanilla-cookieconsent/dist/cookieconsent.css";
import { getFooterMenusDirectus, getMainMenusDirectus } from "@/lib/menus";

const App = ({ Component, pageProps = {}, mainNav, footerNav }) => {
  const site = useSiteContext({
    mainNav,
    footerNav,
  });

  return (
    <SiteContext.Provider value={site}>
      <Component {...pageProps} />
      <CookieConsent />
    </SiteContext.Provider>
  );
};

App.getInitialProps = async function (appContext) {
  const appProps = await NextApp?.getInitialProps(appContext);

  const { mainNav } = await getMainMenusDirectus();
  const { footerNav } = await getFooterMenusDirectus();

  return {
    ...appProps,
    mainNav,
    footerNav,
  };
};

export default App;
