import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";

export default function StudentRegisterSuccess() {
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
       <Link to="/courses">
        Courses
       </Link>
       <Link to="/about">
        About
       </Link>
       <Link to="/contact">
        Contact
       </Link>
      </nav>
     </div>
    </header>
    <div className="status-shell">
     <div className="status-card">
      <div className="status-icon">
       <i className="fa-solid fa-check"></i>
      </div>
      <h2>Student account created successfully.</h2>
      <p>Your student ledger has been prepared. Once backend integration is complete, you'll be able to sign in and start enrolling in courses.</p>
      <div className="status-actions">
       <Link to="/student-login" className="btn btn-primary btn-block">
        Proceed to Student Login
       </Link>
       <Link to="/" className="btn btn-ghost btn-block">
        Back to Home
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
    </>
  );
}
