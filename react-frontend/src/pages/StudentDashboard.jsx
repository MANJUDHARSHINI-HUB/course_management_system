import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

export default function StudentDashboard() {
  return (
    <>
      <PageCss hrefs={["/css/style.css", "/css/dashboard.css", "/css/responsive.css"]} />
    <div className="dash-shell">
     {/* ===================== SIDEBAR ===================== */}
     <aside className="sidebar">
      <Link to="/" className="brand">
       <span className="brand-mark">E</span>
       Edu
       <span style={{color: "var(--gold-light)"}}>Ledger</span>
      </Link>
      <nav>
       <p className="sidebar-section">Overview</p>
       <Link to="/student-dashboard" className="active">
        <i className="fa-solid fa-gauge"></i>
        Dashboard
       </Link>
       <Link to="/notifications">
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
     {/* ===================== MAIN ===================== */}
     <main className="dash-main">
      <div className="dash-topbar">
       <div>
        <div className="breadcrumb">Student Portal</div>
        <h1>Dashboard</h1>
       </div>
       <div className="topbar-actions">
        <Link to="/notifications" className="icon-btn">
         <i className="fa-regular fa-bell"></i>
         <span className="dot"></span>
        </Link>
        <div className="profile-chip">
         <div className="avatar-placeholder">
          <i className="fa-solid fa-user"></i>
         </div>
         <div className="who">
          Student
          <small id="topbar-student-name">Profile pending</small>
         </div>
        </div>
       </div>
      </div>
      <div className="dash-body">
       <div className="welcome-banner">
        <div>
         <h2>
          Welcome,
          <span id="welcome-name">Student.</span>
         </h2>
         <p>Student information will appear here after backend integration.</p>
        </div>
        <Link to="/courses" className="btn btn-primary">
         Browse Courses
        </Link>
       </div>
       {/* Profile placeholder */}
       <div className="panel">
        <div className="panel-head">
         <h3>Student Profile</h3>
        </div>
        <div className="profile-placeholder-card">
         <div className="avatar-lg">
          <i className="fa-solid fa-user"></i>
         </div>
         <div className="profile-fields" style={{flex: "1"}}>
          <div className="pf-item">
           <label>Student Name</label>
           <span id="profile-name-value">Not available yet</span>
          </div>
          <div className="pf-item">
           <label>Student ID</label>
           <span id="profile-id-value">Not available yet</span>
          </div>
          <div className="pf-item">
           <label>Email</label>
           <span id="profile-email-value">Not available yet</span>
          </div>
          <div className="pf-item">
           <label>Department</label>
           <span id="profile-dept-value">Not available yet</span>
          </div>
         </div>
        </div>
        <div className="placeholder-box">Student information will appear here after backend integration.</div>
       </div>
       {/* Stat cards */}
       <div className="stat-grid">
        <div className="stat-card tone-gold">
         <div className="stat-icon">
          <i className="fa-solid fa-book-open"></i>
         </div>
         <span className="value" id="stat-enrolled-count">3</span>
         <span className="label">Enrolled Courses</span>
        </div>
        <div className="stat-card tone-teal">
         <div className="stat-icon">
          <i className="fa-solid fa-spinner"></i>
         </div>
         <span className="value">2</span>
         <span className="label">Ongoing Courses</span>
        </div>
        <div className="stat-card tone-brown">
         <div className="stat-icon">
          <i className="fa-solid fa-circle-check"></i>
         </div>
         <span className="value">1</span>
         <span className="label">Completed Courses</span>
        </div>
        <div className="stat-card tone-danger">
         <div className="stat-icon">
          <i className="fa-solid fa-certificate"></i>
         </div>
         <span className="value">1</span>
         <span className="label">Certificates Earned</span>
        </div>
       </div>
       <div className="dash-columns">
        <div>
         {/* My Courses */}
         <div className="panel">
          <div className="panel-head">
           <h3>My Courses</h3>
           <Link to="/courses" className="see-all">
            View Catalog
           </Link>
          </div>
          <div id="my-courses-list">
           <div className="mini-course">
            <div className="thumb">
             <i className="fa-brands fa-html5"></i>
            </div>
            <div className="info">
             <h4>HTML Fundamentals — CS-101</h4>
             <div className="progress-bar">
              <span style={{width: "72%"}}></span>
             </div>
            </div>
            <span className="pct">72%</span>
           </div>
           <div className="mini-course">
            <div className="thumb">
             <i className="fa-solid fa-sitemap"></i>
            </div>
            <div className="info">
             <h4>Data Structures — CS-204</h4>
             <div className="progress-bar">
              <span style={{width: "45%"}}></span>
             </div>
            </div>
            <span className="pct">45%</span>
           </div>
           <div className="mini-course">
            <div className="thumb">
             <i className="fa-solid fa-brain"></i>
            </div>
            <div className="info">
             <h4>Artificial Intelligence — AI-310</h4>
             <div className="progress-bar">
              <span style={{width: "18%"}}></span>
             </div>
            </div>
            <span className="pct">18%</span>
           </div>
          </div>
         </div>
         {/* Recent activity */}
         <div className="panel">
          <div className="panel-head">
           <h3>Recent Activities</h3>
          </div>
          <div className="activity-item">
           <div className="activity-dot">
            <i className="fa-solid fa-check"></i>
           </div>
           <div>
            <p>
             Completed module 4 of
             <strong>HTML Fundamentals</strong>
            </p>
            <span>2 hours ago</span>
           </div>
          </div>
          <div className="activity-item">
           <div className="activity-dot">
            <i className="fa-solid fa-book"></i>
           </div>
           <div>
            <p>
             Enrolled in
             <strong>Artificial Intelligence</strong>
            </p>
            <span>Yesterday</span>
           </div>
          </div>
          <div className="activity-item">
           <div className="activity-dot">
            <i className="fa-solid fa-certificate"></i>
           </div>
           <div>
            <p>
             Earned certificate for
             <strong>Introduction to CSS</strong>
            </p>
            <span>3 days ago</span>
           </div>
          </div>
         </div>
        </div>
        <div>
         {/* Progress Tracking */}
         <div className="panel">
          <div className="panel-head">
           <h3>Progress Tracking</h3>
          </div>
          <div className="progress-row">
           <div className="progress-label">
            <span>Overall Completion</span>
            <span>45%</span>
           </div>
           <div className="progress-bar">
            <span style={{width: "45%"}}></span>
           </div>
          </div>
          <div className="progress-row">
           <div className="progress-label">
            <span>Weekly Goal</span>
            <span>60%</span>
           </div>
           <div className="progress-bar">
            <span style={{width: "60%"}}></span>
           </div>
          </div>
          <div className="progress-row" style={{marginBottom: "0"}}>
           <div className="progress-label">
            <span>Assignments Submitted</span>
            <span>80%</span>
           </div>
           <div className="progress-bar">
            <span style={{width: "80%"}}></span>
           </div>
          </div>
         </div>
         {/* Academic calendar */}
         <div className="panel">
          <div className="panel-head">
           <h3>Academic Calendar</h3>
          </div>
          <ul className="calendar-list">
           <li>
            <div className="cal-date">
             JUL
             <b>08</b>
            </div>
            <div>Assignment due — Data Structures</div>
           </li>
           <li>
            <div className="cal-date">
             JUL
             <b>15</b>
            </div>
            <div>Mid-term assessment week begins</div>
           </li>
           <li>
            <div className="cal-date">
             JUL
             <b>22</b>
            </div>
            <div>Certificate ceremony — HTML Fundamentals</div>
           </li>
          </ul>
         </div>
         {/* Notifications preview */}
         <div className="panel" style={{marginBottom: "0"}}>
          <div className="panel-head">
           <h3>Notifications</h3>
           <Link to="/notifications" className="see-all">
            See All
           </Link>
          </div>
          <div className="notif-card type-info" style={{marginBottom: "12px"}}>
           <div className="icon">
            <i className="fa-solid fa-bullhorn"></i>
           </div>
           <div>
            <h4>New Course Added</h4>
            <p>Machine Learning is now open for enrollment.</p>
           </div>
          </div>
          <div className="notif-card type-success" style={{marginBottom: "0"}}>
           <div className="icon">
            <i className="fa-solid fa-certificate"></i>
           </div>
           <div>
            <h4>Certificate Ready</h4>
            <p>Your CSS certificate is ready to download.</p>
           </div>
          </div>
         </div>
        </div>
       </div>
      </div>
     </main>
    </div>
      <LegacyScript src="/legacy/js/dashboard.js" />
    </>
  );
}
