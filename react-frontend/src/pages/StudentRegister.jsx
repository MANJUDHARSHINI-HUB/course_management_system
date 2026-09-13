import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

export default function StudentRegister() {
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
       <Link to="/student-login" className="btn btn-ghost btn-sm">
        Student Login
       </Link>
       <Link to="/admin-login" className="btn btn-ghost btn-sm">
        Admin Login
       </Link>
      </div>
     </div>
    </header>
    <div className="auth-shell">
     <div className="auth-visual">
      <div className="auth-visual-card">
       <div className="icon-badge">
        <i className="fa-solid fa-user-graduate"></i>
       </div>
       <h3>Join the student ledger</h3>
       <p>One account gives you access to enrollment, progress tracking and certificates.</p>
       <ul className="auth-visual-list">
        <li>
         <i className="fa-solid fa-check"></i>
         Enroll in unlimited courses
        </li>
        <li>
         <i className="fa-solid fa-check"></i>
         Track progress in real time
        </li>
        <li>
         <i className="fa-solid fa-check"></i>
         Download certificates on completion
        </li>
       </ul>
      </div>
     </div>
     <div className="auth-panel">
      <div className="auth-form-wrap">
       <span className="eyebrow">Student Registration</span>
       <h1>Create your account</h1>
       <p>Fill in your details to open a student ledger.</p>
       <form action="student-register-success.html" id="student-register-form" novalidate="">
        <div className="form-grid">
         <div className="field full">
          <label htmlFor="s-name">
           Full Name
           <span className="required">*</span>
          </label>
          <div className="input-wrap">
           <i className="fa-regular fa-user"></i>
           <input type="text" id="s-name" placeholder="e.g. Aditi Sharma" />
          </div>
          <span className="error-text" id="s-name-error"></span>
         </div>
         <div className="field">
          <label htmlFor="s-id">
           Student ID
           <span className="required">*</span>
          </label>
          <div className="input-wrap">
           <i className="fa-solid fa-id-card"></i>
           <input type="text" id="s-id" placeholder="STU-0000" />
          </div>
          <span className="error-text" id="s-id-error"></span>
         </div>
         <div className="field">
          <label htmlFor="s-dept">
           Department
           <span className="required">*</span>
          </label>
          <div className="input-wrap">
           <i className="fa-solid fa-building-columns"></i>
           <select id="s-dept">
            <option>Computer Science</option>
            <option>Information Technology</option>
            <option>Electronics</option>
            <option>Mechanical Engineering</option>
            <option>Business Administration</option>
           </select>
          </div>
          <span className="error-text" id="s-dept-error"></span>
         </div>
         <div className="field full">
          <label htmlFor="s-email">
           Email Address
           <span className="required">*</span>
          </label>
          <div className="input-wrap">
           <i className="fa-regular fa-envelope"></i>
           <input type="email" id="s-email" placeholder="you@university.edu" />
          </div>
          <span className="error-text" id="s-email-error"></span>
         </div>
         <div className="field full">
          <label htmlFor="s-phone">
           Phone Number
           <span className="required">*</span>
          </label>
          <div className="input-wrap">
           <i className="fa-solid fa-phone"></i>
           <input type="tel" id="s-phone" placeholder="+91 00000 00000" />
          </div>
          <span className="error-text" id="s-phone-error"></span>
         </div>
         <div className="field">
          <label htmlFor="s-pass">
           Password
           <span className="required">*</span>
          </label>
          <div className="input-wrap">
           <i className="fa-solid fa-lock"></i>
           <input type="password" id="s-pass" placeholder="••••••••" />
          </div>
          <span className="error-text" id="s-pass-error"></span>
         </div>
         <div className="field">
          <label htmlFor="s-cpass">
           Confirm Password
           <span className="required">*</span>
          </label>
          <div className="input-wrap">
           <i className="fa-solid fa-lock"></i>
           <input type="password" id="s-cpass" placeholder="••••••••" />
          </div>
          <span className="error-text" id="s-cpass-error"></span>
         </div>
        </div>
        <button type="submit" className="btn btn-primary btn-block mt-8">Create Account</button>
        <div className="form-success-msg" id="register-msg"></div>
       </form>
       <div className="dev-note">
        <i className="fa-solid fa-circle-info"></i>
        Registration functionality will be added in future updates. This form only demonstrates the interface.
       </div>
       <p className="auth-switch">
        Already have an account?
        <Link to="/student-login">
         Log in
        </Link>
       </p>
      </div>
     </div>
    </div>
      <LegacyScript src="/legacy/js/student-register.js" />
    </>
  );
}
