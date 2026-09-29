import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import PageCss from "../components/PageCss";
import { useAuth } from "../auth/AuthContext";
import { useCourses } from "../context/CourseContext";
import api from "../services/api";

export default function StudentDashboard() {
  const { session } = useAuth();
  const { courses } = useCourses();
  const [student, setStudent] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [progress, setProgress] = useState([]);
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadDashboard() {
    if (!session?.username || session.role !== "student") { setLoading(false); return; }
    try {
      setLoading(true); setError("");
      const [studentRes, enrollmentRes, progressRes, savedRes] = await Promise.all([
        api.get(`/students?username=${encodeURIComponent(session.username)}`),
        api.get(`/enrollments?username=${encodeURIComponent(session.username)}`),
        api.get(`/progress?username=${encodeURIComponent(session.username)}`),
        api.get(`/savedCourses?username=${encodeURIComponent(session.username)}`)
      ]);
      setStudent(studentRes.data?.[0] || null);
      setEnrollments(Array.isArray(enrollmentRes.data) ? enrollmentRes.data : []);
      setProgress(Array.isArray(progressRes.data) ? progressRes.data : []);
      setSaved(Array.isArray(savedRes.data) ? savedRes.data : []);
    } catch (err) {
      console.error(err);
      setError("Unable to load your dashboard. Please make sure the Mock API is running on port 5000.");
    } finally { setLoading(false); }
  }

  useEffect(() => { loadDashboard(); const timer = setInterval(loadDashboard, 3000); return () => clearInterval(timer); }, [session]);

  const enrolledCourses = useMemo(() => enrollments.map(e => courses.find(c => String(c.courseCode || c.code).toLowerCase() === String(e.courseCode || "").toLowerCase())).filter(Boolean), [enrollments, courses]);
  const completedCount = progress.filter(p => p.completed === true || Number(p.progress) >= 100).length;
  const ongoingCount = Math.max(0, enrolledCourses.length - completedCount);
  const progressFor = (course) => {
    const code = course.courseCode || course.code;
    const p = progress.find(x => String(x.courseCode || "").toLowerCase() === String(code).toLowerCase());
    return Math.max(0, Math.min(100, Number(p?.progress) || 0));
  };
  const savedCourses = saved.map(s => courses.find(c => String(c.courseCode || c.code).toLowerCase() === String(s.courseCode || "").toLowerCase())).filter(Boolean);

  return <>
    <PageCss hrefs={["/css/style.css", "/css/dashboard.css", "/css/responsive.css"]} />
    <div className="dash-shell">
      <aside className="sidebar">
        <Link to="/" className="brand"><span className="brand-mark">E</span>Edu<span style={{color:"var(--gold-light)"}}>Ledger</span></Link>
        <nav>
          <p className="sidebar-section">Overview</p><Link to="/student-dashboard" className="active"><i className="fa-solid fa-gauge"/> Dashboard</Link><Link to="/notifications"><i className="fa-regular fa-bell"/> Notifications</Link>
          <p className="sidebar-section">Learning</p><Link to="/my-courses"><i className="fa-solid fa-book-open"/> My Courses</Link><Link to="/courses"><i className="fa-solid fa-layer-group"/> Browse Catalog</Link><Link to="/saved-courses"><i className="fa-solid fa-bookmark"/> Saved Courses</Link><Link to="/certificates"><i className="fa-solid fa-certificate"/> Certificates</Link>
          <p className="sidebar-section">Account</p><Link to="/profile"><i className="fa-regular fa-user"/> Profile</Link>
        </nav>
        <div className="sidebar-foot"><Link to="/" className="logout"><i className="fa-solid fa-arrow-right-from-bracket"/> Logout</Link></div>
      </aside>

      <main className="dash-main">
        <div className="dash-topbar"><div><div className="breadcrumb">Student Portal</div><h1>Dashboard</h1></div><div className="topbar-actions"><Link to="/notifications" className="icon-btn"><i className="fa-regular fa-bell"/><span className="dot"/></Link><div className="profile-chip"><div className="avatar-placeholder"><i className="fa-solid fa-user"/></div><div className="who">Student<small>{student?.name || session?.username || "Student"}</small></div></div></div></div>
        <div className="dash-body">
          <div className="welcome-banner"><div><h2>Welcome, {student?.name || "Student"}.</h2><p>Your courses, progress and saved courses are loaded from the Mock API.</p></div><Link to="/courses" className="btn btn-primary">Browse Courses</Link></div>
          {error && <div className="placeholder-box" style={{color:"var(--danger,#d9534f)",marginBottom:16}}>{error}</div>}
          <div className="stat-grid">
            <div className="stat-card tone-gold"><div className="stat-icon"><i className="fa-solid fa-book-open"/></div><span className="value">{loading ? "..." : enrolledCourses.length}</span><span className="label">Enrolled Courses</span></div>
            <div className="stat-card tone-teal"><div className="stat-icon"><i className="fa-solid fa-spinner"/></div><span className="value">{loading ? "..." : ongoingCount}</span><span className="label">Ongoing Courses</span></div>
            <div className="stat-card tone-brown"><div className="stat-icon"><i className="fa-solid fa-circle-check"/></div><span className="value">{loading ? "..." : completedCount}</span><span className="label">Completed Courses</span></div>
            <div className="stat-card tone-danger"><div className="stat-icon"><i className="fa-solid fa-bookmark"/></div><span className="value">{loading ? "..." : savedCourses.length}</span><span className="label">Saved Courses</span></div>
          </div>

          <div className="panel"><div className="panel-head"><h3>Student Profile</h3><Link to="/profile" className="see-all">View Profile</Link></div><div className="profile-placeholder-card"><div className="avatar-lg"><i className="fa-solid fa-user"/></div><div className="profile-fields" style={{flex:1}}><div className="pf-item"><label>Student Name</label><span>{student?.name || "Not available"}</span></div><div className="pf-item"><label>Student ID</label><span>{student?.studentId || student?.id || "Not available"}</span></div><div className="pf-item"><label>Email</label><span>{student?.email || "Not available"}</span></div><div className="pf-item"><label>Department</label><span>{student?.department || student?.dept || "Not available"}</span></div></div></div></div>

          <div className="dash-columns">
            <div>
              <div className="panel"><div className="panel-head"><h3>My Courses</h3><Link to="/my-courses" className="see-all">View All</Link></div>
                {loading ? <div className="placeholder-box">Loading your courses...</div> : enrolledCourses.length === 0 ? <div className="placeholder-box">You have not enrolled in any courses yet. <Link to="/courses">Browse the catalog</Link> to get started.</div> : enrolledCourses.slice(0,5).map(c => <div className="mini-course" key={c.id}><div className="thumb"><i className={c.icon || "fa-solid fa-book"}/></div><div className="info"><h4>{c.courseName || c.name} — {c.courseCode || c.code}</h4><div className="progress-bar"><span style={{width:`${progressFor(c)}%`}}/></div></div><span className="pct">{progressFor(c)}%</span></div>)}
              </div>
              <div className="panel"><div className="panel-head"><h3>Saved Courses</h3><Link to="/saved-courses" className="see-all">View All</Link></div>
                {savedCourses.length === 0 ? <div className="placeholder-box">No saved courses yet. <Link to="/courses">View a course</Link> and click Save Course.</div> : savedCourses.slice(0,5).map(c => <div className="mini-course" key={c.id}><div className="thumb"><i className={c.icon || "fa-solid fa-bookmark"}/></div><div className="info"><h4>{c.courseName || c.name} — {c.courseCode || c.code}</h4><span style={{color:"var(--muted-dim)"}}>Saved for later</span></div><Link to={`/course-learning?course=${encodeURIComponent(c.courseCode || c.code)}`} className="btn btn-ghost btn-sm">View</Link></div>)}
              </div>
            </div>
            <div>
              <div className="panel"><div className="panel-head"><h3>Learning Summary</h3></div><div className="progress-row"><div className="progress-label"><span>Overall completion</span><span>{enrolledCourses.length ? Math.round(progress.reduce((a,p)=>a+(Number(p.progress)||0),0)/enrolledCourses.length) : 0}%</span></div><div className="progress-bar"><span style={{width:`${enrolledCourses.length ? Math.round(progress.reduce((a,p)=>a+(Number(p.progress)||0),0)/enrolledCourses.length) : 0}%`}}/></div></div><p>Enrollments and progress are stored in the Mock API and refresh automatically.</p></div>
              <div className="panel"><div className="panel-head"><h3>Quick Actions</h3></div><Link to="/courses" className="btn btn-primary btn-block">Browse Courses</Link><Link to="/saved-courses" className="btn btn-ghost btn-block" style={{marginTop:10}}>Open Saved Courses</Link><Link to="/my-courses" className="btn btn-ghost btn-block" style={{marginTop:10}}>Open My Courses</Link></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </>;
}
