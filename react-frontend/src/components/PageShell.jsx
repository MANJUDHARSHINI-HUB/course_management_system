import Navbar from "./Navbar";
import Footer from "./Footer";

export default function PageShell({ children, showNavbar = true, showFooter = true }) {
  return <>
    {showNavbar && <Navbar />}
    {children}
    {showFooter && <Footer />}
  </>;
}
