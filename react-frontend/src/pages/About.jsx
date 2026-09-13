import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";

export default function About() {
  return (
    <>
      <PageCss hrefs={["/css/style.css", "/css/responsive.css"]} />
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
       <Link to="/about" className="active">
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
       <Link to="/admin-login" className="btn btn-ghost btn-sm">
        Admin Login
       </Link>
       <span className="divider"></span>
       <Link to="/student-register" className="btn btn-primary btn-sm">
        Get Started
       </Link>
      </div>
     </div>
    </header>
    <section className="page-header">
     <div className="container">
      <div className="breadcrumb">
       <Link to="/">
        Home
       </Link>
       / About
      </div>
      <span className="eyebrow">About EduLedger</span>
      <h1>A ledger-first approach to academic administration.</h1>
      <p>EduLedger was designed around one idea: every course, enrollment and certificate should read like an entry in a well-kept ledger — clear, traceable and easy to reconcile.</p>
     </div>
    </section>
    <section className="section">
     <div className="container grid-3">
      <div className="feature-card">
       <div className="feature-icon">
        <i className="fa-solid fa-bullseye"></i>
       </div>
       <h3>Our Mission</h3>
       <p>Give students and administrators a single, calm system to manage learning — without the clutter of a dozen disconnected tools.</p>
      </div>
      <div className="feature-card">
       <div className="feature-icon">
        <i className="fa-solid fa-eye"></i>
       </div>
       <h3>Our Vision</h3>
       <p>A campus operating system where enrollment, progress and certification are always one click away from being understood.</p>
      </div>
      <div className="feature-card">
       <div className="feature-icon">
        <i className="fa-solid fa-hand-holding-heart"></i>
       </div>
       <h3>Our Values</h3>
       <p>Clarity over clutter, structure over spectacle, and a genuine respect for the people who use the system daily.</p>
      </div>
     </div>
    </section>
    <section className="section section-alt">
     <div className="container">
      <div className="section-head">
       <span className="eyebrow">The Story</span>
       <h2>Built like an academic office, not a storefront.</h2>
       <p>EduLedger began as a single course register kept by one department. Version 1 recreates that register as a full front-end experience — the interface a student sees on registration day, and the console an admin opens every morning.</p>
      </div>
      <div className="grid-4">
       <div className="feature-card">
        <div className="feature-icon">
         <i className="fa-solid fa-code"></i>
        </div>
        <h3>Version 1</h3>
        <p>Pure HTML & CSS interface — every screen a real page, no shortcuts.</p>
       </div>
       <div className="feature-card">
        <div className="feature-icon">
         <i className="fa-solid fa-server"></i>
        </div>
        <h3>Version 2</h3>
        <p>Backend integration for authentication, enrollment and live data.</p>
       </div>
       <div className="feature-card">
        <div className="feature-icon">
         <i className="fa-solid fa-chart-pie"></i>
        </div>
        <h3>Version 3</h3>
        <p>Analytics, reporting and richer academic-calendar tooling.</p>
       </div>
       <div className="feature-card">
        <div className="feature-icon">
         <i className="fa-solid fa-mobile-screen"></i>
        </div>
        <h3>Version 4</h3>
        <p>Companion mobile experience for students on the move.</p>
       </div>
      </div>
     </div>
    </section>
    <section className="section">
     <div className="container">
      <div className="cta-banner">
       <div>
        <span className="eyebrow">Want to see it in action</span>
        <h2>Open a student ledger of your own.</h2>
        <p>Registration takes less than two minutes.</p>
       </div>
       <Link to="/student-register" className="btn btn-primary">
        Student Register
       </Link>
      </div>
     </div>
    </section>
    <footer className="site-footer">
     <div className="container">
      <div className="footer-grid">
       <div className="footer-col">
        <Link to="/" className="brand">
         <span className="brand-mark">E</span>
         Edu
         <span style={{color: "var(--gold-light)"}}>Ledger</span>
        </Link>
        <p className="mt-16">A premium student course management portal for departments that care about the details of learning.</p>
       </div>
       <div className="footer-col">
        <h4>Portal</h4>
        <ul>
         <li>
          <Link to="/">
           Home
          </Link>
         </li>
         <li>
          <Link to="/courses">
           Courses
          </Link>
         </li>
         <li>
          <Link to="/about">
           About
          </Link>
         </li>
         <li>
          <Link to="/contact">
           Contact
          </Link>
         </li>
        </ul>
       </div>
       <div className="footer-col">
        <h4>Students</h4>
        <ul>
         <li>
          <Link to="/student-register">
           Register
          </Link>
         </li>
         <li>
          <Link to="/student-login">
           Login
          </Link>
         </li>
        </ul>
       </div>
       <div className="footer-col">
        <h4>Administrators</h4>
        <ul>
         <li>
          <Link to="/admin-register">
           Register
          </Link>
         </li>
         <li>
          <Link to="/admin-login">
           Login
          </Link>
         </li>
        </ul>
       </div>
      </div>
      <div className="footer-bottom">
       <span>© 2026 EduLedger. All rights reserved.</span>
       <span>Version 1.0 — Front-End UI Preview</span>
      </div>
     </div>
    </footer>
    </>
  );
}
