import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

export default function EnrollPlaceholder() {
  return (
    <>
      <PageCss hrefs={["/css/style.css", "/css/forms.css", "/css/responsive.css"]} />
    <header className="site-header">
     <div className="nav">
      <Link to="/" className="brand">
       <span className="brand-mark">E</span>
       <span className="brand-text">
        Edu
        <span>Ledger</span>
       </span>
      </Link>
      <nav className="nav-links">
       <Link to="/">
        Home
       </Link>
       <Link to="/courses" className="active">
        Courses
       </Link>
       <Link to="/about">
        About
       </Link>
       <Link to="/contact">
        Contact
       </Link>
      </nav>
      <div className="nav-actions">
       <Link to="/student-login" className="btn btn-ghost btn-sm">
        Student Login
       </Link>
       <Link to="/student-register" className="btn btn-primary btn-sm">
        Get Started
       </Link>
      </div>
     </div>
    </header>
    <div className="status-shell">
     <div className="status-card">
      <div className="status-icon pending" id="enroll-status-icon">
       <i className="fa-solid fa-hourglass-half"></i>
      </div>
      <h2 id="enroll-status-heading">Enrollment noted.</h2>
      <p id="enroll-status-text">This course will be added to your enrolled courses after backend integration. For now, this screen only represents how enrollment will look and feel.</p>
      <div className="status-actions">
       <Link to="/courses" className="btn btn-primary btn-block">
        Back to Courses
       </Link>
       <Link to="/student-login" className="btn btn-ghost btn-block">
        Go to Student Login
       </Link>
      </div>
     </div>
    </div>
    <footer className="site-footer">
     <div className="container">
      <div className="footer-bottom">
       <span>© 2026 EduLedger. All rights reserved.</span>
       <span>Version 1.0 — Front-End UI Preview</span>
      </div>
     </div>
    </footer>
      <LegacyScript src="/legacy/js/enroll-placeholder.js" />
    </>
  );
}
