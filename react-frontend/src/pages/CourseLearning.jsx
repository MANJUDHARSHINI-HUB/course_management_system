import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import PageCss from "../components/PageCss";
import { useCourses } from "../context/CourseContext";
import { useAuth } from "../auth/AuthContext";
import api from "../services/api";

const resources = {
  html: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  css: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  javascript: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  python: "https://docs.python.org/3/tutorial/",
  java: "https://dev.java/learn/",
  "c++": "https://cplusplus.com/doc/tutorial/",
  dbms: "https://www.postgresql.org/docs/current/tutorial.html",
  "data structures": "https://www.geeksforgeeks.org/data-structures/",
  "artificial intelligence": "https://developers.google.com/machine-learning/crash-course",
  "machine learning": "https://developers.google.com/machine-learning/crash-course"
};

export default function CourseLearning() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { courses } = useCourses();
  const { session } = useAuth();
  const [student, setStudent] = useState(null);
  const [enrolled, setEnrolled] = useState(false);
  const [saved, setSaved] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [message, setMessage] = useState("");
  const [loadingAction, setLoadingAction] = useState(false);

  const code = params.get("course") || "";
  const course = useMemo(
    () => courses.find(c => String(c.courseCode || c.code).toLowerCase() === code.toLowerCase()),
    [courses, code]
  );

  useEffect(() => {
    async function loadStatus() {
      if (!course || !session || session.role !== "student") return;
      const courseCode = course.courseCode || course.code;
      try {
        const studentRes = await api.get(`/students?username=${encodeURIComponent(session.username)}`);
        const foundStudent = studentRes.data?.[0] || null;
        setStudent(foundStudent);

        const [enrollRes, saveRes, progressRes] = await Promise.all([
          api.get(`/enrollments?username=${encodeURIComponent(session.username)}&courseCode=${encodeURIComponent(courseCode)}`),
          api.get(`/savedCourses?username=${encodeURIComponent(session.username)}&courseCode=${encodeURIComponent(courseCode)}`),
          api.get(`/progress?username=${encodeURIComponent(session.username)}&courseCode=${encodeURIComponent(courseCode)}`)
        ]);
        setEnrolled(Array.isArray(enrollRes.data) && enrollRes.data.length > 0);
        setSaved(Array.isArray(saveRes.data) && saveRes.data.length > 0);
        const p = Array.isArray(progressRes.data) && progressRes.data[0];
        if (p) {
          setProgress(Number(p.progress) || 0);
          setCompleted(Boolean(p.completed));
        }
      } catch (err) {
        console.error("Unable to load course status", err);
      }
    }
    loadStatus();
  }, [course, session]);

  if (!course) {
    return <><PageCss hrefs={["/css/style.css", "/css/forms.css", "/css/responsive.css"]}/><div className="status-shell"><div className="status-card"><h2>Course not found</h2><p>The selected course is not available in the Mock API.</p><Link to="/courses" className="btn btn-primary btn-block">Back to Courses</Link></div></div></>;
  }

  const name = course.courseName || course.name;
  const courseCode = course.courseCode || course.code;
  const description = course.overview || course.desc || "Course description is not available.";
  const resource = resources[name.toLowerCase()] || "https://developer.mozilla.org/";

  async function getStudentForSession() {
    if (!session?.username) return null;
    if (student) return student;
    const response = await api.get(`/students?username=${encodeURIComponent(session.username)}`);
    const found = response.data?.[0] || null;
    setStudent(found);
    return found;
  }

  async function handleEnroll() {
    if (!session || session.role !== "student") { navigate("/student-login"); return; }
    setLoadingAction(true);
    setMessage("");
    try {
      const account = await getStudentForSession();
      if (!account) throw new Error("Student account not found in Mock API.");

      const existing = await api.get(`/enrollments?username=${encodeURIComponent(session.username)}&courseCode=${encodeURIComponent(courseCode)}`);
      if (!existing.data.length) {
        await api.post("/enrollments", {
          username: session.username,
          studentUsername: session.username,
          studentId: account.studentId || account.id,
          courseCode,
          courseId: course.id,
          enrolledAt: new Date().toISOString()
        });
      }

      const progressExisting = await api.get(`/progress?username=${encodeURIComponent(session.username)}&courseCode=${encodeURIComponent(courseCode)}`);
      if (!progressExisting.data.length) {
        await api.post("/progress", { username: session.username, studentId: account.studentId || account.id, courseCode, progress: 0, completed: false });
      }
      setEnrolled(true);
      setMessage(`You are enrolled in ${name}.`);
    } catch (err) {
      console.error(err);
      setMessage(err?.response?.data?.message || "Unable to enroll right now. Please make sure the Mock API is running on port 5000.");
    } finally { setLoadingAction(false); }
  }

  async function handleSave() {
    if (!session || session.role !== "student") { navigate("/student-login"); return; }
    setLoadingAction(true);
    setMessage("");
    try {
      const existing = await api.get(`/savedCourses?username=${encodeURIComponent(session.username)}&courseCode=${encodeURIComponent(courseCode)}`);
      if (existing.data.length) {
        await api.delete(`/savedCourses/${existing.data[0].id}`);
        setSaved(false);
        setMessage("Course removed from Saved Courses.");
      } else {
        await api.post("/savedCourses", {
          username: session.username,
          courseCode,
          courseId: course.id,
          savedAt: new Date().toISOString()
        });
        setSaved(true);
        setMessage("Course saved successfully.");
      }
    } catch (err) {
      console.error(err);
      setMessage(err?.response?.data?.message || "Unable to save the course right now. Please make sure the Mock API is running on port 5000.");
    } finally { setLoadingAction(false); }
  }

  async function handleComplete() {
    if (!enrolled) { setMessage("Enroll in this course before marking it complete."); return; }
    setLoadingAction(true);
    try {
      const existing = await api.get(`/progress?username=${encodeURIComponent(session.username)}&courseCode=${encodeURIComponent(courseCode)}`);
      if (existing.data.length) {
        await api.patch(`/progress/${existing.data[0].id}`, { progress: 100, completed: true, completedAt: new Date().toISOString() });
      } else {
        const account = await getStudentForSession();
        await api.post("/progress", { username: session.username, studentId: account?.studentId || account?.id || "", courseCode, progress: 100, completed: true, completedAt: new Date().toISOString() });
      }
      setProgress(100); setCompleted(true); setMessage("Course completed successfully.");
    } catch (err) { console.error(err); setMessage("Unable to save your course progress."); }
    finally { setLoadingAction(false); }
  }

  return <>
    <PageCss hrefs={["/css/style.css", "/css/forms.css", "/css/responsive.css"]}/>
    <header className="site-header"><div className="nav">
      <Link to="/" className="brand"><span className="brand-mark">E</span><span className="brand-text">Edu<span>Ledger</span></span></Link>
      <nav className="nav-links"><Link to="/student-dashboard">Dashboard</Link><Link to="/courses" className="active">Courses</Link><Link to="/notifications">Notifications</Link></nav>
      <div className="nav-actions"><Link to="/student-dashboard" className="btn btn-ghost btn-sm">My Dashboard</Link></div>
    </div></header>

    <section className="page-header"><div className="container">
      <div className="breadcrumb"><Link to="/courses">Courses</Link> / {name}</div>
      <span className="eyebrow">Course Details</span>
      <h1>{name}</h1>
      <p>{description}</p>
    </div></section>

    <section className="section"><div className="container">
      <div className="panel" style={{marginBottom:"24px"}}>
        <div className="panel-head"><div><h3>{courseCode}</h3><p style={{margin:0}}>Instructor: <strong>{course.instructor}</strong> · {course.duration} · {course.level}</p></div><span className={`pill ${enrolled ? "active" : ""}`}>{enrolled ? "Enrolled" : "Not enrolled"}</span></div>
        <p style={{fontSize:"16px",lineHeight:1.7}}>{description}</p>
        <div style={{display:"flex",gap:"10px",flexWrap:"wrap"}}>
          <button type="button" className="btn btn-primary" onClick={handleEnroll} disabled={loadingAction || enrolled}><i className="fa-solid fa-book-open"></i> {enrolled ? "Enrolled" : "Enroll Now"}</button>
          <button type="button" className="btn btn-ghost" onClick={handleSave} disabled={loadingAction}><i className={`fa-${saved ? "solid" : "regular"} fa-bookmark`}></i> {saved ? "Saved" : "Save Course"}</button>
        </div>
        {message && <div className="form-success-msg" style={{display:"block",marginTop:"14px"}}>{message}</div>}
      </div>

      <div className="grid-3">
        <div className="panel"><div className="panel-head"><h3>About this course</h3></div><p>{description}</p><p><strong>Category:</strong> {course.category || "General"}</p><p><strong>Level:</strong> {course.level}</p></div>
        <div className="panel"><div className="panel-head"><h3>Learning Outcomes</h3></div>{(course.learningOutcomes || []).map((item,i)=><p key={i}><i className="fa-solid fa-check" style={{marginRight:"8px"}}></i>{item}</p>)}</div>
        <div className="panel"><div className="panel-head"><h3>Course Modules</h3></div>{(course.modules || []).map((item,i)=><p key={i}><strong>{i+1}.</strong> {item}</p>)}</div>
      </div>

      <div className="grid-3" style={{marginTop:"24px"}}>
        <div className="panel"><div className="panel-head"><h3>Reading Material</h3></div><p>Open the recommended documentation for this course.</p><a className="btn btn-primary btn-block" href={resource} target="_blank" rel="noreferrer">Read Documentation</a></div>
        <div className="panel"><div className="panel-head"><h3>Video Learning</h3></div><p>Find video tutorials for {name}.</p><a className="btn btn-ghost btn-block" href={`https://www.youtube.com/results?search_query=${encodeURIComponent(name+" tutorial")}`} target="_blank" rel="noreferrer">Watch Videos</a></div>
        <div className="panel"><div className="panel-head"><h3>{completed ? "Completed" : "Course Progress"}</h3></div><div className="progress-row"><div className="progress-label"><span>Progress</span><span>{progress}%</span></div><div className="progress-bar"><span style={{width:`${progress}%`}}></span></div></div><button type="button" className="btn btn-primary btn-block" onClick={handleComplete} disabled={loadingAction || completed}>{completed ? "Course Completed" : "Mark as Complete"}</button></div>
      </div>

      <div className="status-card" style={{marginTop:"24px"}}><h2>Continue learning</h2><p>Enrollment is separate from viewing. Opening this page never enrolls you automatically.</p><div className="status-actions"><Link to="/courses" className="btn btn-primary btn-block">Browse Courses</Link><Link to="/my-courses" className="btn btn-ghost btn-block">My Courses</Link><Link to="/saved-courses" className="btn btn-ghost btn-block">Saved Courses</Link></div></div>
    </div></section>
  </>;
}
