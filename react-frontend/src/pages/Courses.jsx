import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";
import CourseCard from "../components/CourseCard";
import { useCourses } from "../context/CourseContext";
import { useMemo, useState } from "react";

export default function Courses() {
  const { courses, loading, error } = useCourses();
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState("all");

  const filtered = useMemo(() => courses.filter((course) => {
    const name = (course.courseName || course.name || "").toLowerCase();
    const code = (course.courseCode || course.code || "").toLowerCase();
    return (!query || name.includes(query.toLowerCase()) || code.includes(query.toLowerCase())) &&
      (level === "all" || (course.level || "").toLowerCase() === level);
  }), [courses, query, level]);

  return (
    <>
      <PageCss hrefs={["/css/style.css", "/css/responsive.css"]} />
      <header className="site-header"><div className="nav">
        <Link to="/" className="brand"><span className="brand-mark">E</span><span className="brand-text">Edu<span>Ledger</span></span></Link>
        <nav className="nav-links"><Link to="/">Home</Link><Link to="/courses" className="active">Courses</Link><Link to="/about">About</Link><Link to="/contact">Contact</Link></nav>
        <div className="nav-actions"><Link to="/student-login" className="btn btn-ghost btn-sm">Student Login</Link><Link to="/admin-login" className="btn btn-ghost btn-sm">Admin Login</Link><span className="divider"></span><Link to="/student-register" className="btn btn-primary btn-sm">Get Started</Link></div>
      </div></header>
      <section className="page-header"><div className="container"><div className="breadcrumb"><Link to="/">Home</Link> / Courses</div><span className="eyebrow">Course Catalog</span><h1>Ten courses. One clear path to a certificate.</h1><p>Every course below shows its instructor, duration and level up front — enroll to add it to your student ledger.</p></div></section>
      <section className="section"><div className="container">
        <div className="panel" style={{ marginBottom: "24px" }}><div className="panel-head"><div><h3>Find a Course</h3><p style={{ margin: 0, color: "var(--muted-dim)" }}>Search by course name and filter by difficulty level.</p></div><strong>{filtered.length} {filtered.length === 1 ? "course" : "courses"} shown</strong></div>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 220px", gap: "12px" }}><div className="input-wrap"><i className="fa-solid fa-magnifying-glass"></i><input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search HTML, React, AI, Docker..." /></div><select value={level} onChange={(e) => setLevel(e.target.value)}><option value="all">All Levels</option><option value="beginner">Beginner</option><option value="intermediate">Intermediate</option><option value="advanced">Advanced</option></select></div>
        </div>
        {loading && <div className="placeholder-box">Loading courses...</div>}
        {error && <div className="placeholder-box" style={{ color: "var(--danger, #d9534f)" }}>{error}</div>}
        {!loading && !error && filtered.length === 0 && <div className="placeholder-box">No courses match your search.</div>}
        {!loading && !error && <div className="grid-3">{filtered.map((course) => <CourseCard key={course.id} course={course} />)}</div>}
      </div></section>
      <footer className="site-footer"><div className="container"><div className="footer-bottom"><span>© 2026 EduLedger. All rights reserved.</span><span>Version 2.0 — React Course Management Portal</span></div></div></footer>
    </>
  );
}
