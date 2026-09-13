/* =====================================================================
   STORAGE.JS
   Central place for every Local Storage read/write used across the
   portal (accounts, session, courses added by admin, enrollments and
   remembered login details). Kept in one file so every page uses the
   exact same keys and the exact same helper functions instead of
   repeating this logic on every page.
   ===================================================================== */

// ----- Local Storage keys (kept together so they are easy to check) -----
var LS_KEYS = {
  students: "eduledger_students",
  admins: "eduledger_admins",
  session: "eduledger_session",
  extraCourses: "eduledger_extra_courses",
  enrollments: "eduledger_enrollments",
  rememberStudent: "eduledger_remember_student",
  rememberAdmin: "eduledger_remember_admin"
};

// ----- small generic helpers -----
function lsGet(key, fallback) {
  try {
    var raw = localStorage.getItem(key);
    if (raw === null) {
      return fallback;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.log("Error reading '" + key + "' from Local Storage: " + err);
    return fallback;
  }
}

function lsSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    console.log("Error saving '" + key + "' to Local Storage: " + err);
    return false;
  }
}

// ===================== STUDENT ACCOUNTS =====================

function getStudents() {
  return lsGet(LS_KEYS.students, []);
}

function saveStudents(list) {
  lsSet(LS_KEYS.students, list);
}

function findStudentByUsername(username) {
  var students = getStudents();
  var cleanUsername = username.trim().toLowerCase();
  for (var i = 0; i < students.length; i++) {
    if (students[i].username.trim().toLowerCase() === cleanUsername) {
      return students[i];
    }
  }
  return null;
}

// returns true if added, false if the username already exists
function addStudent(studentObject) {
  if (findStudentByUsername(studentObject.username) !== null) {
    return false;
  }
  var students = getStudents();
  students.push(studentObject);
  saveStudents(students);

  // give the new student an empty enrollment list right away
  var enrollments = getEnrollments();
  enrollments[studentObject.username.trim().toLowerCase()] = [];
  saveEnrollments(enrollments);

  return true;
}

// ===================== ADMIN ACCOUNTS =====================

function getAdmins() {
  return lsGet(LS_KEYS.admins, []);
}

function saveAdmins(list) {
  lsSet(LS_KEYS.admins, list);
}

function findAdminByUsername(username) {
  var admins = getAdmins();
  var cleanUsername = username.trim().toLowerCase();
  for (var i = 0; i < admins.length; i++) {
    if (admins[i].username.trim().toLowerCase() === cleanUsername) {
      return admins[i];
    }
  }
  return null;
}

// returns true if added, false if the username already exists
function addAdmin(adminObject) {
  if (findAdminByUsername(adminObject.username) !== null) {
    return false;
  }
  var admins = getAdmins();
  admins.push(adminObject);
  saveAdmins(admins);
  return true;
}

// ===================== PASSWORD UPDATES (Forgot Password) =====================

// looks for the username in students first, then admins.
// returns "student", "admin" or null depending on where it was found.
function updatePasswordByUsername(username, newPassword) {
  var students = getStudents();
  var cleanUsername = username.trim().toLowerCase();

  for (var i = 0; i < students.length; i++) {
    if (students[i].username.trim().toLowerCase() === cleanUsername) {
      students[i].password = newPassword;
      saveStudents(students);
      return "student";
    }
  }

  var admins = getAdmins();
  for (var j = 0; j < admins.length; j++) {
    if (admins[j].username.trim().toLowerCase() === cleanUsername) {
      admins[j].password = newPassword;
      saveAdmins(admins);
      return "admin";
    }
  }

  return null;
}

// ===================== SESSION (cleared on logout) =====================

function setSession(role, username) {
  lsSet(LS_KEYS.session, { role: role, username: username });
}

function getSession() {
  return lsGet(LS_KEYS.session, null);
}

// Logout only ends the session. It never touches saved accounts,
// courses or enrollments - those all stay in Local Storage.
function clearSession() {
  try {
    localStorage.removeItem(LS_KEYS.session);
  } catch (err) {
    console.log("Error clearing session: " + err);
  }
}

// Sends the visitor back to the right login page if they are not
// logged in with the required role. Call at the top of protected pages.
function requireLogin(requiredRole) {
  var session = getSession();
  if (session === null || session.role !== requiredRole) {
    window.location.href = requiredRole === "admin" ? "admin-login.html" : "student-login.html";
    return null;
  }
  return session;
}

// ===================== REMEMBER LOGIN INFO =====================

function rememberLogin(role, username, password) {
  var key = role === "admin" ? LS_KEYS.rememberAdmin : LS_KEYS.rememberStudent;
  lsSet(key, { username: username, password: password });
}

function forgetLogin(role) {
  var key = role === "admin" ? LS_KEYS.rememberAdmin : LS_KEYS.rememberStudent;
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.log("Error clearing remembered login: " + err);
  }
}

function getRememberedLogin(role) {
  var key = role === "admin" ? LS_KEYS.rememberAdmin : LS_KEYS.rememberStudent;
  return lsGet(key, null);
}

// ===================== COURSES =====================
// coursesData (from data.js) holds the original catalog. Courses added
// by an Admin are stored separately in Local Storage and merged in, so
// the original file never has to be rewritten by JavaScript.

function getExtraCourses() {
  return lsGet(LS_KEYS.extraCourses, []);
}

function saveExtraCourses(list) {
  lsSet(LS_KEYS.extraCourses, list);
}

// full catalog = original coursesData (data.js) + admin added courses
function getAllCourses() {
  var base = (typeof coursesData !== "undefined") ? coursesData : [];
  return base.concat(getExtraCourses());
}

function findCourseByCode(code) {
  var all = getAllCourses();
  for (var i = 0; i < all.length; i++) {
    if (all[i].code.trim().toLowerCase() === code.trim().toLowerCase()) {
      return all[i];
    }
  }
  return null;
}

function courseNameExists(name) {
  var all = getAllCourses();
  var cleanName = name.trim().toLowerCase();
  for (var i = 0; i < all.length; i++) {
    if (all[i].name.trim().toLowerCase() === cleanName) {
      return true;
    }
  }
  return false;
}

// returns true if added, false if the course code/name already exists
function addCourse(courseObject) {
  if (findCourseByCode(courseObject.code) !== null) {
    return false;
  }
  if (courseNameExists(courseObject.name)) {
    return false;
  }
  var extra = getExtraCourses();
  extra.push(courseObject);
  saveExtraCourses(extra);
  return true;
}

// ===================== ENROLLMENTS =====================
// Stored as one object: { "student@email.com": ["CS-101", "AI-310"], ... }

function getEnrollments() {
  return lsGet(LS_KEYS.enrollments, {});
}

function saveEnrollments(obj) {
  lsSet(LS_KEYS.enrollments, obj);
}

function getEnrolledCourseCodes(username) {
  var enrollments = getEnrollments();
  var key = username.trim().toLowerCase();
  return enrollments[key] || [];
}

function isEnrolled(username, courseCode) {
  var codes = getEnrolledCourseCodes(username);
  for (var i = 0; i < codes.length; i++) {
    if (codes[i].trim().toLowerCase() === courseCode.trim().toLowerCase()) {
      return true;
    }
  }
  return false;
}

// returns true if enrolled successfully, false if already enrolled
function enrollStudentInCourse(username, courseCode) {
  if (isEnrolled(username, courseCode)) {
    return false;
  }
  var enrollments = getEnrollments();
  var key = username.trim().toLowerCase();
  if (!enrollments[key]) {
    enrollments[key] = [];
  }
  enrollments[key].push(courseCode);
  saveEnrollments(enrollments);
  return true;
}

// total number of enrollments across every student (used on the
// Admin Dashboard "Active Enrollments" stat card)
function getTotalEnrollmentCount() {
  var enrollments = getEnrollments();
  var total = 0;
  for (var key in enrollments) {
    if (enrollments.hasOwnProperty(key)) {
      total += enrollments[key].length;
    }
  }
  return total;
}

// how many students are enrolled in one specific course code
function getEnrollmentCountForCourse(courseCode) {
  var enrollments = getEnrollments();
  var count = 0;
  for (var key in enrollments) {
    if (enrollments.hasOwnProperty(key)) {
      for (var i = 0; i < enrollments[key].length; i++) {
        if (enrollments[key][i].trim().toLowerCase() === courseCode.trim().toLowerCase()) {
          count++;
        }
      }
    }
  }
  return count;
}
