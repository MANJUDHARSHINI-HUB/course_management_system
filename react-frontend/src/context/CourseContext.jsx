import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const CourseContext = createContext(null);

function cacheCourses(courses) {
  try {
    localStorage.setItem("eduledger_api_courses", JSON.stringify(courses));
  } catch {}
}

export function CourseProvider({ children }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchCourses() {
    try {
      setLoading(true);
      const response = await api.get("/courses");
      const data = Array.isArray(response.data) ? response.data : [];
      setCourses(data);
      cacheCourses(data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch courses:", err);
      try {
        const cached = JSON.parse(localStorage.getItem("eduledger_api_courses") || "[]");
        setCourses(Array.isArray(cached) ? cached : []);
      } catch {}
      setError("Unable to load courses. Please make sure the Mock API is running on port 5000.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchCourses(); }, []);

  async function addCourse(course) {
    const response = await api.post("/courses", course);
    setCourses((previous) => {
      const next = [...previous, response.data];
      cacheCourses(next);
      return next;
    });
    return response.data;
  }

  async function updateCourse(id, updatedCourse) {
    const response = await api.put(`/courses/${id}`, updatedCourse);
    setCourses((previous) => {
      const next = previous.map((course) => String(course.id) === String(id) ? response.data : course);
      cacheCourses(next);
      return next;
    });
    return response.data;
  }

  async function deleteCourse(id) {
    await api.delete(`/courses/${id}`);
    setCourses((previous) => {
      const next = previous.filter((course) => String(course.id) !== String(id));
      cacheCourses(next);
      return next;
    });
  }

  return (
    <CourseContext.Provider value={{ courses, loading, error, fetchCourses, addCourse, updateCourse, deleteCourse }}>
      {children}
    </CourseContext.Provider>
  );
}

export function useCourses() {
  return useContext(CourseContext);
}
