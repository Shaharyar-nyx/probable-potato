import { Fragment, ReactNode } from "react";

import Footer from "components/Footer";
import Nav from "components/Nav";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Nav />
      <div className="bg-ethereo layout min-h-screen scroll-smooth">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
