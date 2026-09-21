import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

export default function StudentLogin() {
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
       <Link to="/student-register" className="btn btn-ghost btn-sm">
        Register
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
        <i className="fa-solid fa-book-open-reader"></i>
       </div>
       <h3>Welcome back, learner</h3>
       <p>Sign in to pick up your courses exactly where you left off.</p>
       <ul className="auth-visual-list">
        <li>
         <i className="fa-solid fa-check"></i>
         Resume ongoing courses
        </li>
        <li>
         <i className="fa-solid fa-check"></i>
         View progress & certificates
        </li>
        <li>
         <i className="fa-solid fa-check"></i>
         Check academic notifications
        </li>
       </ul>
      </div>
     </div>
     <div className="auth-panel">
      <div className="auth-form-wrap">
       <span className="eyebrow">Student Login</span>
       <h1>Sign in to your ledger</h1>
       <p>Enter your credentials to access your student dashboard.</p>
       <form id="student-login-form" novalidate="">
        <div className="field">
         <label htmlFor="sl-email">Email Address</label>
         <div className="input-wrap">
          <i className="fa-regular fa-envelope"></i>
          <input type="email" id="sl-email" placeholder="you@university.edu" />
         </div>
         <span className="error-text" id="sl-email-error"></span>
        </div>
        <div className="field">
         <label htmlFor="sl-pass">Password</label>
         <div className="input-wrap">
          <i className="fa-solid fa-lock"></i>
          <input type="password" id="sl-pass" placeholder="••••••••" />
         </div>
         <span className="error-text" id="sl-pass-error"></span>
        </div>
        <div className="form-row-between">
         <label className="checkbox-row">
          <input type="checkbox" />
          Remember me
         </label>
         <Link to="/forgot-password">
          Forgot Password?
         </Link>
        </div>
        <button type="submit" className="btn btn-primary btn-block">Login</button>
        <div className="form-success-msg" id="login-msg"></div>
        <Link to="/student-register" className="btn btn-ghost btn-block mt-16">
         Register
        </Link>
       </form>
       <div className="dev-note">
        <i className="fa-solid fa-circle-info"></i>
        Authentication functionality will be added in future updates.
       </div>
       <p className="auth-switch">
        New to EduLedger?
        <Link to="/student-register">
         Create an account
        </Link>
       </p>
      </div>
     </div>
    </div>
      <LegacyScript src="/legacy/js/student-login.js" />
    </>
  );
}
