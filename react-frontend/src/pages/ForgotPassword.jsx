import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

export default function ForgotPassword() {
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
        <i className="fa-solid fa-key"></i>
       </div>
       <h3>Reset your access</h3>
       <p>Set a new password to get back into your ledger securely.</p>
       <ul className="auth-visual-list">
        <li>
         <i className="fa-solid fa-check"></i>
         Works for students and admins
        </li>
        <li>
         <i className="fa-solid fa-check"></i>
         One-time secure reset link
        </li>
        <li>
         <i className="fa-solid fa-check"></i>
         No data is stored in Version 1
        </li>
       </ul>
      </div>
     </div>
     <div className="auth-panel">
      <div className="auth-form-wrap">
       <span className="eyebrow">Account Recovery</span>
       <h1>Forgot your password?</h1>
       <p>Enter your email and choose a new password below.</p>
       <form id="forgot-password-form">
        <div className="field">
         <label htmlFor="fp-email">Email Address</label>
         <div className="input-wrap">
          <i className="fa-regular fa-envelope"></i>
          <input type="email" id="fp-email" placeholder="you@university.edu" />
         </div>
         <span className="error-text" id="fp-email-error"></span>
        </div>
        <div className="field">
         <label htmlFor="fp-new">New Password</label>
         <div className="input-wrap">
          <i className="fa-solid fa-lock"></i>
          <input type="password" id="fp-new" placeholder="••••••••" />
         </div>
         <span className="error-text" id="fp-new-error"></span>
        </div>
        <div className="field">
         <label htmlFor="fp-confirm">Confirm Password</label>
         <div className="input-wrap">
          <i className="fa-solid fa-lock"></i>
          <input type="password" id="fp-confirm" placeholder="••••••••" />
         </div>
         <span className="error-text" id="fp-confirm-error"></span>
        </div>
        <button type="button" className="btn btn-primary btn-block mt-8" id="reset-btn">Reset Password</button>
        <div className="form-success-msg" id="reset-msg"></div>
       </form>
       <div className="dev-note">
        <i className="fa-solid fa-circle-info"></i>
        Password reset functionality will be added once the backend is integrated.
       </div>
       <p className="auth-switch">
        Remembered your password?
        <Link to="/student-login">
         Back to Login
        </Link>
       </p>
      </div>
     </div>
    </div>
      <LegacyScript src="/legacy/js/forgot-password.js" />
    </>
  );
}
