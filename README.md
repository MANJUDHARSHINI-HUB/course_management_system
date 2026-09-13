# Student Course Management Portal

## About the Project

The **Student Course Management Portal** is a web-based application designed to manage student and course-related activities through a simple and user-friendly portal.

The system provides separate functionality for **students and administrators**, including student registration, login, course viewing, course enrollment, dashboards, notifications, and administrative management.

The project is developed using **HTML, CSS, JavaScript, and Bootstrap**, with JavaScript and Local Storage used for handling the application's functionality and data.

## Main Features

### Student Features

* Student registration
* Student login
* Student dashboard
* View available courses
* Enroll in courses
* View enrolled courses
* Notifications
* Session management
* Forgot password functionality
* Logout

### Admin Features

* Admin registration
* Admin login
* Admin dashboard
* Course management
* Student-related management
* Notifications
* Session management
* Logout

## Technology Used

* **HTML5** — Page structure
* **CSS3** — Styling and layout
* **JavaScript** — Application logic and navigation
* **Bootstrap** — Responsive UI components and styling
* **Local Storage** — Client-side data and session management

## Project Update

The existing Student Course Management Portal has been updated according to the required project architecture while keeping the original application as unchanged as possible.

The primary update is the **navigation system**.

Internal navigation has been updated so that navigation is handled through **JavaScript/React-based navigation** where required instead of relying on unnecessary direct HTML page navigation.

The existing:

* Features
* Colors
* Design
* Layout
* Content
* CSS
* Bootstrap styling
* JavaScript functionality
* Forms
* Dashboards
* Course functionality

are preserved.

Additional architecture and features required from the provided Task 6 example have also been incorporated without unnecessarily changing the original user interface.

## Objective of the Update

The objective is to technically improve the existing **Student Course Management Portal** while maintaining its original appearance and functionality.

In simple terms:

> **The original Student Course Management Portal remains the same in terms of design and features, while the required navigation and application architecture are updated according to the new requirements.**

## Folder Structure

```text
Student-Course-Management-Portal/
│
├── frontend/
│   └── Original Student Course Management Portal
│
├── react-frontend/
│   ├── public/
│   ├── src/
│   │   ├── auth/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── CHANGE_REPORT.md
└── README.md
```

## React Architecture

The updated version uses:

* React
* Vite
* React Router
* Reusable components
* Authentication context
* Legacy JavaScript compatibility where required
* Existing Local Storage functionality

The React version contains reusable components such as:

* Navbar
* Footer
* PageShell
* CourseCard
* LegacyScript
* PageCss

## Navigation

The updated application uses React Router for internal page navigation.

Navigation is handled using JavaScript/React mechanisms such as:

```text
Link
NavLink
navigate()
history.pushState()
```

where appropriate.

This allows the application to navigate between pages without unnecessarily relying on traditional HTML page-to-page navigation.

## Design Preservation

The original design has been preserved.

No unnecessary changes have been made to:

* Color scheme
* Fonts
* Layout
* Navbar
* Footer
* Buttons
* Forms
* Course cards
* Dashboard design
* Bootstrap styling
* Existing CSS
* Existing content

## Local Storage

The existing Local Storage functionality is preserved.

Existing data structures and storage keys are retained so that the original application logic can continue to work with the updated version.

## Original Project Backup

The original project is retained inside the package as a reference and backup.

This makes it possible to compare the original implementation with the updated React implementation.

## Running the React Version

Navigate to the React frontend:

```bash
cd react-frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

To create a production build:

```bash
npm run build
```

## Conclusion

The **Student Course Management Portal** has been technically upgraded while maintaining the original application's design and functionality.

The main focus of the update is to introduce the required **React + Vite architecture, React Router navigation, reusable components, authentication context, and compatibility with the existing JavaScript and Local Storage functionality** without unnecessarily changing the original portal.
