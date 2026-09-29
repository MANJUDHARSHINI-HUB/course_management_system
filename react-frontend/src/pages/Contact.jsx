import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";

export default function Contact() {
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
       <Link to="/contact" className="active">
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
       / Contact
      </div>
      <span className="eyebrow">Get In Touch</span>
      <h1>Questions about the portal? Write to the office.</h1>
      <p>Whether you're a student, an instructor, or an administrator evaluating EduLedger for your department, we'd love to hear from you.</p>
     </div>
    </section>
    <section className="section">
     <div className="container" style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "56px", alignItems: "flex-start"}}>
      <div>
       <div className="feature-card mb-16">
        <div className="feature-icon">
         <i className="fa-solid fa-envelope"></i>
        </div>
        <h3>Email</h3>
        <p>admissions@eduledger.example</p>
       </div>
       <div className="feature-card mb-16">
        <div className="feature-icon">
         <i className="fa-solid fa-phone"></i>
        </div>
        <h3>Phone</h3>
        <p>+91 98765 43210 (Mon–Fri, 9am–5pm)</p>
       </div>
       <div className="feature-card">
        <div className="feature-icon">
         <i className="fa-solid fa-location-dot"></i>
        </div>
        <h3>Campus Office</h3>
        <p>Academic Block B, Room 214, University Road</p>
       </div>
      </div>
      <form className="panel" style={{marginBottom: "0"}} id="contact-form">
       <div className="field">
        <label htmlFor="c-name">
         Full Name
         <span className="required">*</span>
        </label>
        <div className="input-wrap">
         <i className="fa-regular fa-user"></i>
         <input type="text" id="c-name" placeholder="Enter your full name" />
        </div>
        <span className="error-text" id="c-name-error"></span>
       </div>
       <div className="field">
        <label htmlFor="c-email">
         Email Address
         <span className="required">*</span>
        </label>
        <div className="input-wrap">
         <i className="fa-regular fa-envelope"></i>
         <input type="email" id="c-email" placeholder="you@example.com" />
        </div>
        <span className="error-text" id="c-email-error"></span>
       </div>
       <div className="field">
        <label htmlFor="c-subject">Subject</label>
        <div className="input-wrap">
         <i className="fa-regular fa-message"></i>
         <input type="text" id="c-subject" placeholder="What is this about?" />
        </div>
       </div>
       <div className="field">
        <label htmlFor="c-message">
         Message
         <span className="required">*</span>
        </label>
        <div className="input-wrap">
         <i className="fa-regular fa-pen-to-square"></i>
         <input type="text" id="c-message" placeholder="Write your message" style={{height: "110px"}} />
        </div>
        <span className="error-text" id="c-message-error"></span>
       </div>
       <button type="button" className="btn btn-primary btn-block" id="contact-send-btn">Send Message</button>
       <div className="form-success-msg" id="contact-msg"></div>
       <p className="field-hint text-center mt-16">Message delivery will be enabled once the backend is integrated.</p>
      </form>
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
    </>
  );
}
