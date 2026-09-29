# Student Course Management Portal

EduLedger-style Student Course Management Portal with React, Vite and a JSON Server Mock API.

## Project structure

```text
Student-Course-Management-Portal/
├── frontend/
├── react-frontend/
└── mock-api/
    ├── db.json
    └── package.json
```

## Run the project

### 1. Start the Mock API

Open CMD 1:

```cmd
cd /d C:\Users\acer\Downloads\Student-Course-Management-Portal\mock-api
npm install
npm start
```

The API runs at:

`http://localhost:5000`

Useful endpoints:

- `http://localhost:5000/courses`
- `http://localhost:5000/students`
- `http://localhost:5000/admins`
- `http://localhost:5000/enrollments`
- `http://localhost:5000/progress`
- `http://localhost:5000/ratings`
- `http://localhost:5000/savedCourses`
- `http://localhost:5000/notifications`
- `http://localhost:5000/achievements`

Keep CMD 1 running.

### 2. Start React

Open CMD 2:

```cmd
cd /d C:\Users\acer\Downloads\Student-Course-Management-Portal\react-frontend
npm install
npm run dev
```

Open the Vite URL shown in CMD, normally `http://localhost:5173`.

## Initial demo accounts

One student and one admin are intentionally included. You can register additional accounts through the application.

### Student

- Name: Manju Dharshini S
- Email: `manju.dharshini@university.edu`
- Password: `student123`

### Admin

- Name: Anu S
- Email: `anu.s@university.edu`
- Password: `admin123`

## Database

The Mock API database is `mock-api/db.json`.

Courses are loaded by React through:

```text
React → CourseContext → Axios → http://localhost:5000/courses → db.json
```

Adding, editing or deleting a course from the Admin Dashboard updates the Mock API database.

Student and admin registration also writes the new account to the corresponding Mock API resource.

## Important

Run the Mock API before opening the React application. If the API is stopped, the application will show an API error instead of silently pretending that the database is working.
