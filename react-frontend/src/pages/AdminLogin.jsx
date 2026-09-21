import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

export default function AdminLogin() {
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
       <Link to="/admin-register" className="btn btn-ghost btn-sm">
        Register
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
        <i className="fa-solid fa-chart-simple"></i>
       </div>
       <h3>Back to the console</h3>
       <p>Sign in to manage courses, students and enrollment reports.</p>
       <ul className="auth-visual-list">
        <li>
         <i className="fa-solid fa-check"></i>
         Real-time enrollment stats
        </li>
        <li>
         <i className="fa-solid fa-check"></i>
         Course catalog controls
        </li>
        <li>
         <i className="fa-solid fa-check"></i>
         Student directory access
        </li>
       </ul>
      </div>
     </div>
     <div className="auth-panel">
      <div className="auth-form-wrap">
       <span className="eyebrow">Admin Login</span>
       <h1>Sign in to the console</h1>
       <p>Enter your administrator credentials to continue.</p>
       <form id="admin-login-form" novalidate="">
        <div className="field">
         <label htmlFor="al-email">Email Address</label>
         <div className="input-wrap">
          <i className="fa-regular fa-envelope"></i>
          <input type="email" id="al-email" placeholder="admin@university.edu" />
         </div>
         <span className="error-text" id="al-email-error"></span>
        </div>
        <div className="field">
         <label htmlFor="al-pass">Password</label>
         <div className="input-wrap">
          <i className="fa-solid fa-lock"></i>
          <input type="password" id="al-pass" placeholder="••••••••" />
         </div>
         <span className="error-text" id="al-pass-error"></span>
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
        <Link to="/admin-register" className="btn btn-ghost btn-block mt-16">
         Register
        </Link>
       </form>
       <div className="dev-note">
        <i className="fa-solid fa-circle-info"></i>
        Authentication functionality will be added in future updates.
       </div>
       <p className="auth-switch">
        Need an admin account?
        <Link to="/admin-register">
         Register here
        </Link>
       </p>
      </div>
     </div>
    </div>
      <LegacyScript src="/legacy/js/admin-login.js" />
    </>
  );
}
