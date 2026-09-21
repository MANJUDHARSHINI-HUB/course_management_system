import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

export default function Home() {
  return (
    <>
      <PageCss hrefs={["/css/style.css", "/css/responsive.css"]} />
    {/* ===================== HEADER ===================== */}
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
       <Link to="/" className="active">
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
    {/* ===================== HERO ===================== */}
    <section className="hero">
     <div className="hero-glow"></div>
     <div className="container hero-grid">
      <div className="hero-copy">
       <span className="eyebrow">Student Course Management Portal</span>
       <h1>Run your entire academic journey from one ledger.</h1>
       <p className="lead">EduLedger brings enrollment, course tracking, certificates and progress reporting into a single, calm workspace — built for students who register and learn, and admins who manage the catalog.</p>
       <div className="hero-actions">
        <Link to="/student-register" className="btn btn-primary">
         <i className="fa-solid fa-graduation-cap"></i>
         Register as Student
        </Link>
        <Link to="/courses" className="btn btn-ghost">
         <i className="fa-solid fa-book-open"></i>
         Browse Courses
        </Link>
       </div>
       <div className="hero-stats">
        <div className="stat">
         <b>12+</b>
         <span>Active Courses</span>
        </div>
        <div className="stat">
         <b>2.4k</b>
         <span>Enrolled Students</span>
        </div>
        <div className="stat">
         <b>98%</b>
         <span>Completion Rate</span>
        </div>
       </div>
      </div>
      <div className="hero-visual">
       <div className="ledger-stack">
        <div className="ledger-card card-1">
         <span className="code-tag">CS-101</span>
         <h4>Introduction to HTML</h4>
         <p>Instructor: Ms. Farah Khan</p>
         <div className="mini-progress">
          <span style={{width: "72%"}}></span>
         </div>
        </div>
        <div className="ledger-card card-2">
         <span className="code-tag">CS-204</span>
         <h4>Data Structures</h4>
         <p>Instructor: Mr. Aravind Rao</p>
         <div className="mini-progress">
          <span style={{width: "45%"}}></span>
         </div>
        </div>
        <div className="ledger-card card-3">
         <span className="code-tag">AI-310</span>
         <h4>Artificial Intelligence</h4>
         <p>Instructor: Dr. Leena Suri</p>
         <div className="mini-progress">
          <span style={{width: "18%"}}></span>
         </div>
        </div>
       </div>
      </div>
     </div>
    </section>
    {/* ===================== FEATURES ===================== */}
    <section className="section">
     <div className="container">
      <div className="section-head">
       <span className="eyebrow">Why EduLedger</span>
       <h2>Everything a modern campus needs, nothing it doesn't.</h2>
       <p>Built to feel like a real academic system — from the registration desk to the graduation ledger.</p>
      </div>
      <div className="grid-4">
       <div className="feature-card">
        <div className="feature-icon">
         <i className="fa-solid fa-user-graduate"></i>
        </div>
        <h3>Student Records</h3>
        <p>A single home for every learner's profile, department and enrollment history.</p>
       </div>
       <div className="feature-card">
        <div className="feature-icon">
         <i className="fa-solid fa-layer-group"></i>
        </div>
        <h3>Course Catalog</h3>
        <p>Curated courses with clear instructors, duration and difficulty levels.</p>
       </div>
       <div className="feature-card">
        <div className="feature-icon">
         <i className="fa-solid fa-chart-line"></i>
        </div>
        <h3>Progress Tracking</h3>
        <p>Visual progress bars and statistics that make learning feel measurable.</p>
       </div>
       <div className="feature-card">
        <div className="feature-icon">
         <i className="fa-solid fa-certificate"></i>
        </div>
        <h3>Certificates</h3>
        <p>Completion certificates issued the moment a course ledger closes out.</p>
       </div>
      </div>
     </div>
    </section>
    {/* ===================== HOW IT WORKS ===================== */}
    <section className="section section-alt">
     <div className="container">
      <div className="section-head">
       <span className="eyebrow">How It Works</span>
       <h2>From registration desk to graduation ledger.</h2>
      </div>
      <div className="grid-3">
       <div className="feature-card">
        <div className="feature-icon">
         <i className="fa-solid fa-pen-to-square"></i>
        </div>
        <h3>Register</h3>
        <p>Create a student or admin account with your department and contact details.</p>
       </div>
       <div className="feature-card">
        <div className="feature-icon">
         <i className="fa-solid fa-right-to-bracket"></i>
        </div>
        <h3>Sign In</h3>
        <p>Access your private dashboard — separate spaces for students and admins.</p>
       </div>
       <div className="feature-card">
        <div className="feature-icon">
         <i className="fa-solid fa-diagram-project"></i>
        </div>
        <h3>Manage & Learn</h3>
        <p>Enroll in courses, track progress and manage the catalog, all in one ledger.</p>
       </div>
      </div>
     </div>
    </section>
    {/* ===================== FEATURED COURSES ===================== */}
    <section className="section">
     <div className="container">
      <div className="section-head">
       <span className="eyebrow">Featured Courses</span>
       <h2>A catalog built for real computer-science learners.</h2>
      </div>
      <div className="grid-3" id="featured-courses-container">
       <div className="course-card">
        <div className="course-thumb">
         <span className="code-tag">CS-101</span>
         <span className="course-level">Beginner</span>
         <i className="fa-brands fa-html5"></i>
        </div>
        <div className="course-body">
         <h3>HTML Fundamentals</h3>
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
         <p className="desc">Structure the web with semantic, accessible markup from first principles.</p>
         <Link to="/courses" className="btn btn-ghost btn-sm btn-block">
          View Course
         </Link>
        </div>
       </div>
      </div>
      <div className="text-center mt-32">
       <Link to="/courses" className="btn btn-primary">
        See Full Catalog
        <i className="fa-solid fa-arrow-right"></i>
       </Link>
      </div>
     </div>
    </section>
    {/* ===================== CTA ===================== */}
    <section className="section">
     <div className="container">
      <div className="cta-banner">
       <div>
        <span className="eyebrow">Ready when you are</span>
        <h2>Your ledger is waiting to be opened.</h2>
        <p>Register in minutes and step into your student dashboard.</p>
       </div>
       <div className="hero-actions" style={{marginBottom: "0"}}>
        <Link to="/student-register" className="btn btn-primary">
         Student Register
        </Link>
        <Link to="/admin-register" className="btn btn-ghost">
         Admin Register
        </Link>
       </div>
      </div>
     </div>
    </section>
    {/* ===================== FOOTER ===================== */}
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
        <div className="social-row">
         <a href="#">
          <i className="fa-brands fa-facebook-f"></i>
         </a>
         <a href="#">
          <i className="fa-brands fa-instagram"></i>
         </a>
         <a href="#">
          <i className="fa-brands fa-linkedin-in"></i>
         </a>
         <a href="#">
          <i className="fa-brands fa-x-twitter"></i>
         </a>
        </div>
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
         <li>
          <Link to="/forgot-password">
           Forgot Password
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
         <li>
          <Link to="/contact">
           Support
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
      <LegacyScript src="/legacy/js/index.js" />
    </>
  );
}
