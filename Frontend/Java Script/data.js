/* =====================================================================
   DATA.JS
   This file stores all the sample data for the portal using
   JSON objects and JSON arrays (as shown in the faculty notes).
   In a real project this data would come from a server/database,
   so we keep it in one place and other JS files use it.
   ===================================================================== */

// JSON array of course objects (used on courses.html and index.html)
var coursesData = [
  { code: "CS-101", name: "HTML", instructor: "Ms. Farah Khan", duration: "6 weeks", level: "Beginner", icon: "fa-brands fa-html5", desc: "Learn semantic markup and document structure for the modern web." },
  { code: "CS-102", name: "CSS", instructor: "Ms. Farah Khan", duration: "6 weeks", level: "Beginner", icon: "fa-brands fa-css3-alt", desc: "Style, layout and animation techniques for polished interfaces." },
  { code: "CS-150", name: "JavaScript", instructor: "Mr. Rohan Mehta", duration: "8 weeks", level: "Intermediate", icon: "fa-brands fa-js", desc: "Bring interactivity to the browser with modern JavaScript." },
  { code: "CS-160", name: "Python", instructor: "Dr. Nisha Verma", duration: "8 weeks", level: "Intermediate", icon: "fa-brands fa-python", desc: "General-purpose programming with a gentle, readable syntax." },
  { code: "CS-170", name: "Java", instructor: "Mr. Aravind Rao", duration: "9 weeks", level: "Intermediate", icon: "fa-brands fa-java", desc: "Object-oriented fundamentals for large-scale applications." },
  { code: "CS-180", name: "C++", instructor: "Mr. Aravind Rao", duration: "10 weeks", level: "Advanced", icon: "fa-solid fa-code", desc: "Performance-focused programming with manual memory control." },
  { code: "CS-204", name: "DBMS", instructor: "Dr. Leena Suri", duration: "8 weeks", level: "Intermediate", icon: "fa-solid fa-diagram-project", desc: "Relational design, normalization and query fundamentals." },
  { code: "CS-210", name: "Data Structures", instructor: "Mr. Aravind Rao", duration: "10 weeks", level: "Advanced", icon: "fa-solid fa-sitemap", desc: "Arrays to trees \u2014 the building blocks of efficient software." },
  { code: "AI-310", name: "Artificial Intelligence", instructor: "Dr. Leena Suri", duration: "12 weeks", level: "Advanced", icon: "fa-solid fa-brain", desc: "Search, logic and knowledge representation for intelligent systems." },
  { code: "AI-320", name: "Machine Learning", instructor: "Dr. Nisha Verma", duration: "12 weeks", level: "Advanced", icon: "fa-solid fa-robot", desc: "Statistical models and training pipelines for predictive systems." }
];

// JSON array of student objects (used on admin-dashboard.html table)
var studentsData = [
  { name: "Aditi Sharma", id: "STU-1042", dept: "Computer Science", status: "active" },
  { name: "Rohan Mehta", id: "STU-1043", dept: "Information Technology", status: "pending" },
  { name: "Nisha Verma", id: "STU-1044", dept: "Electronics", status: "active" },
  { name: "Karan Malhotra", id: "STU-1045", dept: "Business Administration", status: "inactive" }
];

// JSON object for the logged in student's profile (demo data since
// this project has no backend/database yet, as taught in class we
// simply keep it as a JSON object and print it on the dashboard)
var studentProfile = {
  name: "Aditi Sharma",
  studentId: "STU-1042",
  email: "aditi.sharma@university.edu",
  department: "Computer Science"
};

// JSON array of notification / announcement objects
var notificationsData = [
  { type: "info", icon: "fa-solid fa-hand-sparkles", title: "Welcome to EduLedger", message: "Your student ledger has been prepared. Explore the catalog to begin.", time: "Today, 9:12 AM", unread: true },
  { type: "system", icon: "fa-solid fa-clock", title: "Assignment Reminder", message: "Your Data Structures assignment is due in 3 days.", time: "Today, 8:00 AM", unread: true },
  { type: "info", icon: "fa-solid fa-bullhorn", title: "New Course Added", message: "Machine Learning (AI-320) is now open for enrollment.", time: "Yesterday, 4:45 PM", unread: false },
  { type: "success", icon: "fa-solid fa-certificate", title: "Certificate Ready", message: "Your certificate for Introduction to CSS is ready to download.", time: "3 days ago", unread: false },
  { type: "info", icon: "fa-solid fa-arrows-rotate", title: "Course Update", message: "A new module was added to HTML Fundamentals.", time: "4 days ago", unread: false },
  { type: "system", icon: "fa-solid fa-server", title: "System Notification", message: "Scheduled maintenance this weekend from 1\u20133 AM.", time: "1 week ago", unread: false }
];
