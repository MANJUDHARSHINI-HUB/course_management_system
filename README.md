# Student Course Management Portal — Updated

## What this project is

The **Student Course Management Portal** is a front-end student learning and course-management application built with HTML, CSS, JavaScript and Bootstrap, now accompanied by the required React + Vite + React Router implementation.

The original design, colors, layouts, content and existing functionality are preserved. The update adds only the requested technical/navigation improvements and the new student/admin learning-management features.

## Project structure

```text
Student-Course-Management-Portal-Updated/
│
├── frontend/
│   ├── html/       # Original HTML pages
│   ├── css/        # Original CSS files
│   ├── js/         # Original + updated JavaScript logic
│   
│  
│
├── react-frontend/ # React + Vite + React Router application
│   ├── public/
│   │   ├── css/
│   │   └── legacy/js/
│   │  
│   │   
│   └── src/
│       ├── auth/
│       ├── components/
│       ├── pages/
│       ├── App.jsx
│       ├── main.jsx
│       └── index.css
│
├
└── README_UPDATED.md
```

## How to run the React version

Open PowerShell / Command Prompt in the `react-frontend` folder:

```powershell
cd react-frontend
npm install
npm run dev
```

Then open the Vite URL shown in the terminal, normally:

```text
http://localhost:5173/
```

After dependencies have already been installed, you normally only need:

```powershell
cd react-frontend
npm run dev
```

## React routing

The React application uses **React Router** with `BrowserRouter`, `Routes` and `Route`.

Examples:

```text
/                    Home
/student-login       Student Login
/admin-login         Admin Login
/student-register    Student Registration
/admin-register      Admin Registration
/courses             Course Catalog
/student-dashboard   Student Dashboard
/admin-dashboard     Admin Dashboard
/course-learning     Course Learning
/notifications       Notifications
```

The legacy JavaScript navigation bridge also converts old `.html` navigation requests into React routes so existing JavaScript can continue working without changing the UI.

## New/updated functionality

### 1. Admin login and logout

- Admin login now navigates correctly to the React Admin Dashboard.
- Admin logout clears only the current session and returns to Home.
- Admin account data remains stored.
- Remember Me continues to remember the admin login details when selected.

### 2. Student login and logout

- Student login navigates to the Student Dashboard.
- Student logout clears the current session without deleting the account.
- Remember Me continues to work.

### 3. Admin student-login monitoring

The Admin Dashboard now shows registered students and whether they currently have an active student session in the same browser/storage context.

The admin can use the **Logout** action for a currently active student. The student session guard detects the forced logout and sends the student back to Student Login.

> This is a front-end/localStorage implementation. Without a backend/database, a browser cannot remotely invalidate a session on a completely different device/browser. The active-session feature works within the same browser/storage context.

### 4. Course progress

Each enrolled course now has stored progress.

A student can:

- Open an enrolled course.
- Read documentation.
- Open video-learning resources.
- Track course progress.
- Select **Complete Course**.
- Reach 100% completion.
- Return to the catalog and enroll in another course.

Completed course information remains stored after logout and login.

### 5. Student dashboard progress

The Student Dashboard now calculates:

- Enrolled Courses
- Ongoing Courses
- Completed Courses
- Certificates Earned

from the student's actual Local Storage data instead of fixed sample numbers.

## Existing Local Storage

The original Local Storage keys are preserved, including:

```text
eduledger_students
eduledger_admins
eduledger_session
eduledger_extra_courses
eduledger_enrollments
eduledger_remember_student
eduledger_remember_admin
```

Additional keys are used only for the new requested functionality:

```text
eduledger_course_progress
eduledger_active_students
eduledger_forced_student_logouts
eduledger_active_admins
```

## Design preservation

No redesign was intentionally made.

The existing:

- Colors
- Fonts
- Layout
- Bootstrap styling
- CSS
- Navbar
- Footer
- Forms
- Dashboards
- Course cards
- Icons
- Existing content

are retained.

The new functionality is added around the existing design rather than replacing it.

## Important note about build verification

The JavaScript files were syntax-checked successfully.

A full `npm run build` could not be completed in the current environment because installing the npm dependencies timed out. Therefore, this package does **not** claim that the production Vite build was successfully executed here.

Run locally:

```powershell
cd react-frontend
npm install
npm run build
```

If npm installation succeeds locally, the Vite build can then be verified normally.

## Stability fixes added on September 21, 2026
The latest update fixes the React/legacy JavaScript route timing issue that could make Admin Login/Dashboard appear broken until a browser refresh. Legacy DOM initialization is now invoked only for the page that has just mounted instead of replaying every previously loaded page's DOMContentLoaded handler.

The Student Dashboard now reads the same saved course-progress data used by the Course Learning page, so percentages and progress bars stay synchronized.

Student and admin sessions also have separate role-specific Local Storage records, allowing both roles to be open in separate tabs of the same browser without overwriting each other. The Admin Dashboard now displays student email, login time and last-active time when available.

This remains a front-end Local Storage implementation. True cross-device login monitoring/forced logout requires a backend session service and database.
