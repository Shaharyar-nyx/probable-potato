import { ReactNode, Fragment } from "react";
import Nav from "components/Nav";
import Footer from "components/Footer";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Nav />
      <div className="min-h-screen scroll-smooth bg-ethereo layout">
        <Fragment>{children}</Fragment>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
