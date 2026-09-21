import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

export default function AdminDashboard() {
  return (
    <>
      <PageCss hrefs={["/css/style.css", "/css/dashboard.css", "/css/forms.css", "/css/responsive.css"]} />
    <div className="dash-shell">
     <aside className="sidebar">
      <Link to="/" className="brand">
       <span className="brand-mark">E</span>
       Edu
       <span style={{color: "var(--gold-light)"}}>Ledger</span>
      </Link>
      <nav>
       <p className="sidebar-section">Overview</p>
       <Link to="/admin-dashboard" className="active">
        <i className="fa-solid fa-gauge"></i>
        Dashboard
       </Link>
       <Link to="/notifications">
        <i className="fa-regular fa-bell"></i>
        Notifications
       </Link>
       <p className="sidebar-section">Management</p>
       <a href="#">
        <i className="fa-solid fa-users"></i>
        Student Management
       </a>
       <a href="#">
        <i className="fa-solid fa-book-open"></i>
        Course Management
       </a>
       <a href="#">
        <i className="fa-solid fa-chart-column"></i>
        Reports
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
        <div className="breadcrumb">Admin Console</div>
        <h1>Dashboard</h1>
       </div>
       <div className="topbar-actions">
        <Link to="/notifications" className="icon-btn">
         <i className="fa-regular fa-bell"></i>
         <span className="dot"></span>
        </Link>
        <div className="profile-chip">
         <div className="avatar-placeholder">
          <i className="fa-solid fa-user-shield"></i>
         </div>
         <div className="who">
          Admin
          <small>Profile pending</small>
         </div>
        </div>
       </div>
      </div>
      <div className="dash-body">
       <div className="welcome-banner">
        <div>
         <h2>Welcome, Admin.</h2>
         <p>Admin information will appear here after backend integration.</p>
        </div>
        <a href="#" className="btn btn-primary add-course-trigger">
         <i className="fa-solid fa-plus"></i>
         Add New Course
        </a>
       </div>
       {/* Stat cards */}
       <div className="stat-grid">
        <div className="stat-card tone-gold">
         <span className="trend up">+12%</span>
         <div className="stat-icon">
          <i className="fa-solid fa-user-graduate"></i>
         </div>
         <span className="value" id="stat-total-students">2,438</span>
         <span className="label">Total Students</span>
        </div>
        <div className="stat-card tone-teal">
         <span className="trend new">+2</span>
         <div className="stat-icon">
          <i className="fa-solid fa-book-open"></i>
         </div>
         <span className="value" id="stat-total-courses">10</span>
         <span className="label">Total Courses</span>
        </div>
        <div className="stat-card tone-brown">
         <div className="stat-icon">
          <i className="fa-solid fa-diagram-project"></i>
         </div>
         <span className="value" id="stat-total-enrollments">3,912</span>
         <span className="label">Active Enrollments</span>
        </div>
        <div className="stat-card tone-danger">
         <div className="stat-icon">
          <i className="fa-solid fa-certificate"></i>
         </div>
         <span className="value">874</span>
         <span className="label">Certificates Issued</span>
        </div>
       </div>
       <div className="dash-columns">
        <div>
         {/* Student Management */}
         <div className="panel">
          <div className="panel-head">
           <h3>Student Management</h3>
           <a href="#" className="see-all">View All</a>
          </div>
          <table className="data-table">
           <thead>
            <tr>
             <th>Student / Login Details</th>
             <th>Department</th>
             <th>Status</th>
             <th></th>
            </tr>
           </thead>
           <tbody id="student-table-body">
            <tr>
             <td>
              Aditi Sharma
              <br />
              <small style={{color: "var(--muted-dim)"}}>STU-1042</small>
             </td>
             <td>Computer Science</td>
             <td>
              <span className="pill active">Active</span>
             </td>
             <td className="table-actions">
              <a href="#">
               <i className="fa-regular fa-eye"></i>
              </a>
              <a href="#">
               <i className="fa-regular fa-pen-to-square"></i>
              </a>
             </td>
            </tr>
           </tbody>
          </table>
         </div>
         {/* Course Management */}
         <div className="panel" style={{marginBottom: "0"}}>
          <div className="panel-head">
           <h3>Course Management</h3>
           <a href="#" className="btn btn-primary btn-sm add-course-trigger">
            <i className="fa-solid fa-plus"></i>
            Add New Course
           </a>
          </div>
          <table className="data-table">
           <thead>
            <tr>
             <th>Course</th>
             <th>Instructor</th>
             <th>Enrolled</th>
             <th></th>
            </tr>
           </thead>
           <tbody id="course-table-body">
            <tr>
             <td>
              HTML
              <br />
              <small style={{color: "var(--muted-dim)"}}>CS-101</small>
             </td>
             <td>Ms. Farah Khan</td>
             <td>512</td>
             <td className="table-actions">
              <a href="#">
               <i className="fa-regular fa-pen-to-square"></i>
              </a>
              <a href="#">
               <i className="fa-regular fa-trash-can"></i>
              </a>
             </td>
            </tr>
           </tbody>
          </table>
          <div className="placeholder-box mt-16">Course editing and removal will be enabled after backend integration.</div>
         </div>
        </div>
        <div>
         {/* Reports */}
         <div className="panel">
          <div className="panel-head">
           <h3>Reports</h3>
          </div>
          <div className="progress-row">
           <div className="progress-label">
            <span>Enrollment Growth</span>
            <span>+12%</span>
           </div>
           <div className="progress-bar">
            <span style={{width: "62%"}}></span>
           </div>
          </div>
          <div className="progress-row">
           <div className="progress-label">
            <span>Course Completion Rate</span>
            <span>78%</span>
           </div>
           <div className="progress-bar">
            <span style={{width: "78%"}}></span>
           </div>
          </div>
          <div className="progress-row" style={{marginBottom: "0"}}>
           <div className="progress-label">
            <span>Certificate Issuance</span>
            <span>54%</span>
           </div>
           <div className="progress-bar">
            <span style={{width: "54%"}}></span>
           </div>
          </div>
         </div>
         {/* Notifications preview */}
         <div className="panel" style={{marginBottom: "0"}}>
          <div className="panel-head">
           <h3>Notifications</h3>
           <Link to="/notifications" className="see-all">
            See All
           </Link>
          </div>
          <div className="notif-card type-system" style={{marginBottom: "12px"}}>
           <div className="icon">
            <i className="fa-solid fa-server"></i>
           </div>
           <div>
            <h4>System Notification</h4>
            <p>Scheduled maintenance this weekend.</p>
           </div>
          </div>
          <div className="notif-card type-info" style={{marginBottom: "0"}}>
           <div className="icon">
            <i className="fa-solid fa-user-plus"></i>
           </div>
           <div>
            <h4>New Registrations</h4>
            <p>14 new students registered today.</p>
           </div>
          </div>
         </div>
        </div>
       </div>
      </div>
     </main>
    </div>
      <LegacyScript src="/legacy/js/admin-dashboard.js" />
    </>
  );
}
