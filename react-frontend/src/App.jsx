import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import StudentLogin from "./pages/StudentLogin";
import AdminLogin from "./pages/AdminLogin";
import StudentRegister from "./pages/StudentRegister";
import AdminRegister from "./pages/AdminRegister";
import StudentRegisterSuccess from "./pages/StudentRegisterSuccess";
import AdminRegisterSuccess from "./pages/AdminRegisterSuccess";
import ForgotPassword from "./pages/ForgotPassword";
import Courses from "./pages/Courses";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Notifications from "./pages/Notifications";
import EnrollPlaceholder from "./pages/EnrollPlaceholder";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CourseLearning from "./pages/CourseLearning";
export default function App() { return <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/student-login" element={<StudentLogin />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/student-register" element={<StudentRegister />} />
      <Route path="/admin-register" element={<AdminRegister />} />
      <Route path="/student-register-success" element={<StudentRegisterSuccess />} />
      <Route path="/admin-register-success" element={<AdminRegisterSuccess />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/enroll-placeholder" element={<EnrollPlaceholder />} />
      <Route path="/course-learning" element={<CourseLearning />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
</Routes>; }
