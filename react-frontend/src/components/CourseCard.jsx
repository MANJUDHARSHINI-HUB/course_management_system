import { Link } from "react-router-dom";

export default function CourseCard({ course }) {
  const name = course.courseName || course.name;
  const code = course.courseCode || course.code;
  const description = course.overview || course.desc;
  return (
    <div className="course-card">
      <div className="course-thumb" style={course.image ? { backgroundImage: `url(${course.image})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}>
        <span className="code-tag">{code}</span>
        <span className="course-level">{course.level}</span>
        {!course.image && <i className={course.icon || "fa-solid fa-graduation-cap"}></i>}
      </div>
      <div className="course-body">
        <h3>{name}</h3>
        <div className="course-meta">
          <span><i className="fa-regular fa-clock"></i> {course.duration}</span>
          <span><i className="fa-regular fa-user"></i> {course.instructor}</span>
        </div>
        <p className="desc">{description}</p>
        <Link to={`/course-learning?course=${encodeURIComponent(code)}`} className="btn btn-primary btn-sm btn-block">
          View Course
        </Link>
      </div>
    </div>
  );
}
