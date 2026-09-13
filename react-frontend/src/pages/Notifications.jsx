import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

export default function Notifications() {
  return (
    <>
      <PageCss hrefs={["/css/style.css", "/css/dashboard.css", "/css/responsive.css"]} />
    <div className="dash-shell">
     <aside className="sidebar">
      <Link to="/" className="brand">
       <span className="brand-mark">E</span>
       Edu
       <span style={{color: "var(--gold-light)"}}>Ledger</span>
      </Link>
      <nav>
       <p className="sidebar-section">Overview</p>
       <Link to="/student-dashboard">
        <i className="fa-solid fa-gauge"></i>
        Dashboard
       </Link>
       <Link to="/notifications" className="active">
        <i className="fa-regular fa-bell"></i>
        Notifications
       </Link>
       <p className="sidebar-section">Learning</p>
       <Link to="/courses">
        <i className="fa-solid fa-book-open"></i>
        My Courses
       </Link>
       <Link to="/courses">
        <i className="fa-solid fa-layer-group"></i>
        Browse Catalog
       </Link>
       <a href="#">
        <i className="fa-solid fa-certificate"></i>
        Certificates
       </a>
       <a href="#">
        <i className="fa-regular fa-calendar"></i>
        Academic Calendar
       </a>
       <p className="sidebar-section">Account</p>
       <a href="#">
        <i className="fa-regular fa-user"></i>
        Profile
       </a>
       <a href="#">
        <i className="fa-solid fa-gear"></i>
        Settings
       </a>
      </nav>
      <div className="sidebar-foot">
       <Link to="/" className="logout">
        <i className="fa-solid fa-arrow-right-from-bracket"></i>
        Logout
       </Link>
      </div>
     </aside>
     <main className="dash-main">
      <div className="dash-topbar">
       <div>
        <div className="breadcrumb">Student Portal</div>
        <h1>Notification Center</h1>
       </div>
       <div className="topbar-actions">
        <div className="profile-chip">
         <div className="avatar-placeholder">
          <i className="fa-solid fa-user"></i>
         </div>
         <div className="who">
          Student
          <small>Profile pending</small>
         </div>
        </div>
       </div>
      </div>
      <div className="dash-body">
       <div className="panel" style={{maxWidth: "760px"}} id="notifications-container">
        <div className="notif-card type-info">
         <div className="icon">
          <i className="fa-solid fa-hand-sparkles"></i>
         </div>
         <div>
          <h4>Welcome to EduLedger</h4>
          <p>Your student ledger has been prepared. Explore the catalog to begin.</p>
          <time>Today, 9:12 AM</time>
         </div>
         <span className="unread-dot"></span>
        </div>
       </div>
      </div>
     </main>
    </div>
      <LegacyScript src="/legacy/js/notifications.js" />
    </>
  );
}
