import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import PageCss from "../components/PageCss";
import { useCourses } from "../context/CourseContext";
import api from "../services/api";

export default function AdminDashboard() {
  const { courses, addCourse, updateCourse, deleteCourse, fetchCourses } = useCourses();
  const [students, setStudents] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadAdminData() {
    try {
      setLoading(true); setError("");
      const [studentRes, enrollmentRes, progressRes] = await Promise.all([
        api.get("/students"), api.get("/enrollments"), api.get("/progress")
      ]);
      setStudents(Array.isArray(studentRes.data) ? studentRes.data : []);
      setEnrollments(Array.isArray(enrollmentRes.data) ? enrollmentRes.data : []);
      setProgress(Array.isArray(progressRes.data) ? progressRes.data : []);
      await fetchCourses();
    } catch (err) {
      console.error(err); setError("Unable to load admin data. Please make sure the Mock API is running on port 5000.");
    } finally { setLoading(false); }
  }

  useEffect(() => { loadAdminData(); const timer = setInterval(loadAdminData, 5000); return () => clearInterval(timer); }, []);

  const completed = progress.filter(p => p.completed === true).length;
  const enrollmentCoverage = students.length ? Math.round(new Set(enrollments.map(e => e.username)).size / students.length * 100) : 0;
  const completionRate = enrollments.length ? Math.round(completed / enrollments.length * 100) : 0;
  const courseEnrollmentCount = (course) => enrollments.filter(e => String(e.courseCode || "").toLowerCase() === String(course.courseCode || course.code).toLowerCase()).length;
  const studentEnrollmentCount = (student) => enrollments.filter(e => String(e.username || "").toLowerCase() === String(student.username || student.email || "").toLowerCase()).length;
  const studentCompletedCount = (student) => progress.filter(p => String(p.username || "").toLowerCase() === String(student.username || student.email || "").toLowerCase() && p.completed).length;

  async function handleAddCourse() {
    const name = prompt("Course name:", "Cloud Computing"); if (name === null) return;
    const code = prompt("Course code:", "CS-280"); if (code === null) return;
    const instructor = prompt("Instructor:", "Dr. Leena Suri"); if (instructor === null) return;
    const duration = prompt("Duration:", "8 weeks"); if (duration === null) return;
    const level = prompt("Level (Beginner / Intermediate / Advanced):", "Beginner"); if (level === null) return;
    const overview = prompt("Description:", "Learn the fundamentals of this course."); if (overview === null) return;
    try {
      const duplicate = courses.some(c => String(c.courseCode || c.code).toLowerCase() === code.trim().toLowerCase());
      if (duplicate) { alert("Course code already exists."); return; }
      const nextId = String(Math.max(0, ...courses.map(c => Number(c.id) || 0)) + 1);
      await addCourse({ id: nextId, courseName: name.trim(), name: name.trim(), courseCode: code.trim(), code: code.trim(), instructor: instructor.trim(), duration: duration.trim(), level: ["Beginner","Intermediate","Advanced"].includes(level.trim()) ? level.trim() : "Beginner", category: "General", image: "", icon: "fa-solid fa-book", status: "Active", overview: overview.trim(), desc: overview.trim(), learningOutcomes: ["Understand the fundamentals", "Practice core concepts", "Apply concepts in exercises", "Build a small project"], modules: ["Introduction", "Core Concepts", "Practical Exercises", "Project", "Review"], enrollmentCount: 0, averageRating: 0 });
      await loadAdminData();
    } catch (err) { console.error(err); alert("Unable to add the course. Please make sure the Mock API is running."); }
  }

  async function handleEditCourse(course) {
    const name = prompt("Course name:", course.courseName || course.name); if (name === null) return;
    const instructor = prompt("Instructor:", course.instructor); if (instructor === null) return;
    const duration = prompt("Duration:", course.duration); if (duration === null) return;
    const level = prompt("Level (Beginner / Intermediate / Advanced):", course.level); if (level === null) return;
    const overview = prompt("Description:", course.overview || course.desc); if (overview === null) return;
    try {
      await updateCourse(course.id, {...course, courseName:name.trim() || course.courseName, name:name.trim() || course.name, instructor:instructor.trim() || course.instructor, duration:duration.trim() || course.duration, level:["Beginner","Intermediate","Advanced"].includes(level.trim()) ? level.trim() : course.level, overview:overview.trim() || course.overview, desc:overview.trim() || course.desc});
      await loadAdminData();
    } catch (err) { console.error(err); alert("Unable to update the course."); }
  }

  async function handleDeleteCourse(course) {
    if (!window.confirm(`Delete ${course.courseName || course.name}?`)) return;
    try { await deleteCourse(course.id); await loadAdminData(); }
    catch (err) { console.error(err); alert("Unable to delete the course."); }
  }

  return <>
    <PageCss hrefs={["/css/style.css", "/css/dashboard.css", "/css/forms.css", "/css/responsive.css"]}/>
    <div className="dash-shell">
      <aside className="sidebar"><Link to="/" className="brand"><span className="brand-mark">E</span>Edu<span style={{color:"var(--gold-light)"}}>Ledger</span></Link><nav>
        <p className="sidebar-section">Overview</p><Link to="/admin-dashboard" className="active"><i className="fa-solid fa-gauge"></i> Dashboard</Link><Link to="/notifications"><i className="fa-regular fa-bell"></i> Notifications</Link>
        <p className="sidebar-section">Management</p><a href="#student-table-body"><i className="fa-solid fa-users"></i> Student Management</a><a href="#course-table-body"><i className="fa-solid fa-book-open"></i> Course Management</a><a href="#reports"><i className="fa-solid fa-chart-column"></i> Reports</a>
        <p className="sidebar-section">Account</p><a href="#"><i className="fa-regular fa-user"></i> Profile</a><a href="#"><i className="fa-solid fa-gear"></i> Settings</a>
      </nav><div className="sidebar-foot"><Link to="/" className="logout"><i className="fa-solid fa-arrow-right-from-bracket"></i> Logout</Link></div></aside>
      <main className="dash-main"><div className="dash-topbar"><div><div className="breadcrumb">Admin Console</div><h1>Dashboard</h1></div><div className="topbar-actions"><Link to="/notifications" className="icon-btn"><i className="fa-regular fa-bell"></i><span className="dot"></span></Link><div className="profile-chip"><div className="avatar-placeholder"><i className="fa-solid fa-user-shield"></i></div><div className="who">Admin<small>Administrator</small></div></div></div></div>
        <div className="dash-body">
          <div className="welcome-banner"><div><h2>Welcome, Admin.</h2><p>Monitor students, courses, enrollments and certificates from one place.</p></div><button type="button" className="btn btn-primary add-course-trigger" onClick={handleAddCourse}><i className="fa-solid fa-plus"></i> Add New Course</button></div>
          {error && <div className="placeholder-box" style={{color:"var(--danger,#d9534f)",marginBottom:"16px"}}>{error}</div>}
          <div className="stat-grid"><div className="stat-card tone-gold"><div className="stat-icon"><i className="fa-solid fa-user-graduate"></i></div><span className="value">{students.length}</span><span className="label">Total Students</span></div><div className="stat-card tone-teal"><div className="stat-icon"><i className="fa-solid fa-book-open"></i></div><span className="value">{courses.length}</span><span className="label">Total Courses</span></div><div className="stat-card tone-brown"><div className="stat-icon"><i className="fa-solid fa-diagram-project"></i></div><span className="value">{enrollments.length}</span><span className="label">Active Enrollments</span></div><div className="stat-card tone-danger"><div className="stat-icon"><i className="fa-solid fa-certificate"></i></div><span className="value">{completed}</span><span className="label">Certificates Issued</span></div></div>
          <div className="panel" style={{marginBottom:"24px"}}><div className="panel-head"><h3>Quick Management</h3><span className="muted-action">Live Mock API data</span></div><div style={{display:"grid",gridTemplateColumns:"repeat(4,minmax(0,1fr))",gap:"12px"}}><Link to="/courses" className="btn btn-ghost"><i className="fa-solid fa-book-open"></i> View Catalog</Link><a href="#course-table-body" className="btn btn-ghost"><i className="fa-solid fa-pen-to-square"></i> Manage Courses</a><a href="#student-table-body" className="btn btn-ghost"><i className="fa-solid fa-users"></i> View Students</a><Link to="/notifications" className="btn btn-ghost"><i className="fa-regular fa-bell"></i> Notifications</Link></div></div>
          <div className="dash-columns"><div>
            <div className="panel"><div className="panel-head"><h3>Student Management</h3><span className="see-all">{loading ? "Loading..." : `${students.length} registered`}</span></div><table className="data-table"><thead><tr><th>Student / Login Details</th><th>Department</th><th>Learning</th><th>Status</th></tr></thead><tbody id="student-table-body">{students.length ? students.map(s=><tr key={s.id}><td>{s.name}<br/><small style={{color:"var(--muted-dim)"}}>{s.studentId || s.id}</small><br/><small style={{color:"var(--muted-dim)"}}>{s.email}</small></td><td>{s.department || s.dept || "-"}</td><td><strong>{studentEnrollmentCount(s)}</strong> enrolled<br/><small style={{color:"var(--muted-dim)"}}>{studentCompletedCount(s)} completed</small></td><td><span className="pill inactive">Registered</span></td></tr>) : <tr><td colSpan="4"><div className="placeholder-box">No registered students yet.</div></td></tr>}</tbody></table></div>
            <div className="panel" style={{marginBottom:0}}><div className="panel-head"><h3>Course Management</h3><button type="button" className="btn btn-primary btn-sm" onClick={handleAddCourse}><i className="fa-solid fa-plus"></i> Add New Course</button></div><table className="data-table"><thead><tr><th>Course</th><th>Instructor</th><th>Enrolled</th><th></th></tr></thead><tbody id="course-table-body">{courses.map(c=><tr key={c.id}><td>{c.courseName || c.name}<br/><small style={{color:"var(--muted-dim)"}}>{c.courseCode || c.code}</small></td><td>{c.instructor}</td><td><strong>{courseEnrollmentCount(c)}</strong></td><td className="table-actions"><button type="button" className="btn btn-ghost btn-sm" onClick={()=>handleEditCourse(c)}><i className="fa-regular fa-pen-to-square"></i> Edit</button><button type="button" className="btn btn-ghost btn-sm" onClick={()=>handleDeleteCourse(c)}><i className="fa-regular fa-trash-can"></i> Delete</button></td></tr>)}</tbody></table><div className="placeholder-box mt-16">Enrollment counts are calculated directly from the Mock API. When a student enrolls in HTML, the HTML row immediately shows <strong>1</strong>.</div></div>
          </div><div>
            <div className="panel" id="reports"><div className="panel-head"><h3>Reports</h3></div><div className="progress-row"><div className="progress-label"><span>Enrollment Coverage</span><span>{enrollmentCoverage}%</span></div><div className="progress-bar"><span style={{width:`${enrollmentCoverage}%`}}></span></div></div><div className="progress-row"><div className="progress-label"><span>Course Completion Rate</span><span>{completionRate}%</span></div><div className="progress-bar"><span style={{width:`${completionRate}%`}}></span></div></div><div className="progress-row" style={{marginBottom:0}}><div className="progress-label"><span>Certificate Issuance</span><span>{completionRate}%</span></div><div className="progress-bar"><span style={{width:`${completionRate}%`}}></span></div></div></div>
            <div className="panel" style={{marginBottom:0}}><div className="panel-head"><h3>Notifications</h3><Link to="/notifications" className="see-all">See All</Link></div><div className="notif-card type-system" style={{marginBottom:"12px"}}><div className="icon"><i className="fa-solid fa-server"></i></div><div><h4>System Notification</h4><p>Scheduled maintenance this weekend.</p></div></div><div className="notif-card type-info" style={{marginBottom:0}}><div className="icon"><i className="fa-solid fa-user-plus"></i></div><div><h4>New Registrations</h4><p>{students.length} registered student account{students.length===1?"":"s"} in the Mock API.</p></div></div></div>
          </div></div>
        </div>
      </main>
    </div>
  </>;
}
