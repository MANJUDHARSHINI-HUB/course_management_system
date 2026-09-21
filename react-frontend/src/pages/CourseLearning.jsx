import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

export default function CourseLearning() {
  return (
    <>
      <PageCss hrefs={["/css/style.css", "/css/forms.css", "/css/responsive.css"]} />
      <header className="site-header">
        <div className="nav">
          <Link to="/" className="brand"><span className="brand-mark">E</span><span className="brand-text">Edu<span>Ledger</span></span></Link>
          <nav className="nav-links">
            <Link to="/student-dashboard">Dashboard</Link>
            <Link to="/courses">Courses</Link>
            <Link to="/notifications">Notifications</Link>
          </nav>
          <div className="nav-actions">
            <Link to="/student-dashboard" className="btn btn-ghost btn-sm">My Dashboard</Link>
          </div>
        </div>
      </header>

      <section className="page-header">
        <div className="container">
          <div className="breadcrumb"><Link to="/student-dashboard">Dashboard</Link> / Course Learning</div>
          <span className="eyebrow">Learning Workspace</span>
          <h1 id="learning-course-title">Course</h1>
          <p id="learning-course-desc">Your enrolled course learning area.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="panel">
            <div className="panel-head">
              <div>
                <h3 id="learning-course-code">Course Code</h3>
                <p style={{margin: 0}}>Instructor: <strong id="learning-instructor">Instructor</strong> · Student: <strong id="learning-student">Student</strong></p>
              </div>
              <span className="pill active" id="learning-progress-badge">0%</span>
            </div>
            <div className="progress-row">
              <div className="progress-label"><span>Course Progress</span><span id="learning-progress">0%</span></div>
              <div className="progress-bar"><span id="learning-progress-bar" style={{width: "0%"}}></span></div>
            </div>
          </div>

          <div className="grid-3">
            <div className="panel">
              <div className="panel-head"><h3><i className="fa-regular fa-file-lines"></i> Reading Material</h3></div>
              <p>Open the recommended documentation and study the course topics at your own pace.</p>
              <a id="reading-resource" className="btn btn-primary btn-block" href="#"><i className="fa-regular fa-file-lines"></i> Read Documentation</a>
            </div>
            <div className="panel">
              <div className="panel-head"><h3><i className="fa-solid fa-play"></i> Video Learning</h3></div>
              <p>Open a video-learning search for the current course and continue learning visually.</p>
              <a id="video-resource" className="btn btn-ghost btn-block" href="#"><i className="fa-solid fa-video"></i> Watch Videos</a>
            </div>
            <div className="panel">
              <div className="panel-head"><h3><i className="fa-solid fa-circle-check"></i> Finish Course</h3></div>
              <p>After you finish the reading and video lessons, mark this course as completed.</p>
              <button id="complete-course-btn" type="button" className="btn btn-primary btn-block"><i className="fa-solid fa-check"></i> Complete Course</button>
              <div id="completion-message" className="form-success-msg" style={{display: "none"}}></div>
            </div>
          </div>

          <div className="status-card" style={{marginTop: "24px"}}>
            <h2>Ready for another course?</h2>
            <p>Once you complete this course, return to the catalog and enroll in another available course.</p>
            <div className="status-actions">
              <Link to="/courses" className="btn btn-primary btn-block">Browse Courses</Link>
              <Link to="/student-dashboard" className="btn btn-ghost btn-block">Back to Dashboard</Link>
            </div>
          </div>
        </div>
      </section>
      <LegacyScript src="/legacy/js/course-learning.js" />
    </>
  );
}
