import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

export default function AdminRegister() {
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
      <div className="nav-actions">
       <Link to="/admin-login" className="btn btn-ghost btn-sm">
        Admin Login
       </Link>
       <Link to="/student-login" className="btn btn-ghost btn-sm">
        Student Login
       </Link>
      </div>
     </div>
    </header>
    <div className="auth-shell">
     <div className="auth-visual">
      <div className="auth-visual-card">
       <div className="icon-badge">
        <i className="fa-solid fa-user-shield"></i>
       </div>
       <h3>Administer the catalog</h3>
       <p>Admin accounts manage courses, students and enrollment records.</p>
       <ul className="auth-visual-list">
        <li>
         <i className="fa-solid fa-check"></i>
         Add and edit courses
        </li>
        <li>
         <i className="fa-solid fa-check"></i>
         Oversee student records
        </li>
        <li>
         <i className="fa-solid fa-check"></i>
         Review enrollment reports
        </li>
       </ul>
      </div>
     </div>
     <div className="auth-panel">
      <div className="auth-form-wrap">
       <span className="eyebrow">Admin Registration</span>
       <h1>Create an admin account</h1>
       <p>Fill in your details to request administrative access.</p>
       <form action="admin-register-success.html" id="admin-register-form" novalidate="">
        <div className="form-grid">
         <div className="field full">
          <label htmlFor="a-name">
           Full Name
           <span className="required">*</span>
          </label>
          <div className="input-wrap">
           <i className="fa-regular fa-user"></i>
           <input type="text" id="a-name" placeholder="e.g. Karan Malhotra" />
          </div>
          <span className="error-text" id="a-name-error"></span>
         </div>
         <div className="field full">
          <label htmlFor="a-id">
           Admin ID
           <span className="required">*</span>
          </label>
          <div className="input-wrap">
           <i className="fa-solid fa-id-badge"></i>
           <input type="text" id="a-id" placeholder="ADM-0000" />
          </div>
          <span className="error-text" id="a-id-error"></span>
         </div>
         <div className="field full">
          <label htmlFor="a-email">
           Email Address
           <span className="required">*</span>
          </label>
          <div className="input-wrap">
           <i className="fa-regular fa-envelope"></i>
           <input type="email" id="a-email" placeholder="you@university.edu" />
          </div>
          <span className="error-text" id="a-email-error"></span>
         </div>
         <div className="field full">
          <label htmlFor="a-phone">
           Phone Number
           <span className="required">*</span>
          </label>
          <div className="input-wrap">
           <i className="fa-solid fa-phone"></i>
           <input type="tel" id="a-phone" placeholder="+91 00000 00000" />
          </div>
          <span className="error-text" id="a-phone-error"></span>
         </div>
         <div className="field">
          <label htmlFor="a-pass">
           Password
           <span className="required">*</span>
          </label>
          <div className="input-wrap">
           <i className="fa-solid fa-lock"></i>
           <input type="password" id="a-pass" placeholder="••••••••" />
          </div>
          <span className="error-text" id="a-pass-error"></span>
         </div>
         <div className="field">
          <label htmlFor="a-cpass">
           Confirm Password
           <span className="required">*</span>
          </label>
          <div className="input-wrap">
           <i className="fa-solid fa-lock"></i>
           <input type="password" id="a-cpass" placeholder="••••••••" />
          </div>
          <span className="error-text" id="a-cpass-error"></span>
         </div>
        </div>
        <button type="submit" className="btn btn-primary btn-block mt-8">Create Admin Account</button>
        <div className="form-success-msg" id="register-msg"></div>
       </form>
       <div className="dev-note">
        <i className="fa-solid fa-circle-info"></i>
        Registration functionality will be added in future updates. This form only demonstrates the interface.
       </div>
       <p className="auth-switch">
        Already an admin?
        <Link to="/admin-login">
         Log in
        </Link>
       </p>
      </div>
     </div>
    </div>
      <LegacyScript src="/legacy/js/admin-register.js" />
    </>
  );
}
