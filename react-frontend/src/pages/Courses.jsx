import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

export default function Courses() {
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
       / Courses
      </div>
      <span className="eyebrow">Course Catalog</span>
      <h1>Ten courses. One clear path to a certificate.</h1>
      <p>Every course below shows its instructor, duration and level up front — enroll to add it to your student ledger.</p>
     </div>
    </section>
    <section className="section">
     <div className="container grid-3" id="courses-container">
      <div className="course-card">
       <div className="course-thumb">
        <span className="code-tag">CS-101</span>
        <span className="course-level">Beginner</span>
        <i className="fa-brands fa-html5"></i>
       </div>
       <div className="course-body">
        <h3>HTML</h3>
        <div className="course-meta">
         <span>
          <i className="fa-regular fa-clock"></i>
          6 weeks
         </span>
         <span>
          <i className="fa-regular fa-user"></i>
          Ms. Farah Khan
         </span>
        </div>
        <p className="desc">Learn semantic markup and document structure for the modern web.</p>
        <div className="progress-row">
         <div className="progress-label">
          <span>Not enrolled</span>
          <span>0%</span>
         </div>
         <div className="progress-bar">
          <span style={{width: "0%"}}></span>
         </div>
        </div>
        <Link to="/enroll-placeholder" className="btn btn-primary btn-sm btn-block">
         Enroll
        </Link>
       </div>
      </div>
     </div>
    </section>
    <footer className="site-footer">
     <div className="container">
      <div className="footer-bottom">
       <span>© 2026 EduLedger. All rights reserved.</span>
       <span>Version 1.0 — Front-End UI Preview</span>
      </div>
     </div>
    </footer>
      <LegacyScript src="/legacy/js/courses.js" />
    </>
  );
}
