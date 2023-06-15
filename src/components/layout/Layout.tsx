import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";

type LayoutProps = {
  children: ReactNode;
};

const blacklist = ["/login", "/login/signup"];

const Layout = (props: LayoutProps) => {
  const { pathname } = useLocation();
  const isShow = !blacklist.some((path) => pathname.includes(path));

  return (
    <div>
      {isShow && <Header />}
      <div>{props.children}</div>
      {isShow && <Footer />}
    </div>
  );
};

export default Layout;
