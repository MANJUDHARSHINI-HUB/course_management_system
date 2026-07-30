/* =====================================================================
   ADMIN-DASHBOARD.JS
   Fills the Student Management and Course Management tables, the
   stat cards, and the "Add New Course" modal, all using real data
   saved in Local Storage (falling back to the original sample data
   from data.js so the page still looks right before anyone has
   registered or added anything yet).
   ===================================================================== */

function buildStudentRow(student) {
  var row = "<tr>";
  row += "<td>" + student.name + " <br><small style=\"color:var(--muted-dim);\">" + student.id + "</small></td>";
  row += "<td>" + student.dept + "</td>";
  row += "<td><span class=\"pill " + student.status + "\">" + student.status.charAt(0).toUpperCase() + student.status.slice(1) + "</span></td>";
  row += "<td class=\"table-actions\"><a href=\"#\"><i class=\"fa-regular fa-eye\"></i></a><a href=\"#\"><i class=\"fa-regular fa-pen-to-square\"></i></a></td>";
  row += "</tr>";
  return row;
}

function buildCourseRow(course, enrolledCount) {
  var row = "<tr>";
  row += "<td>" + course.name + " <br><small style=\"color:var(--muted-dim);\">" + course.code + "</small></td>";
  row += "<td>" + course.instructor + "</td>";
  row += "<td>" + enrolledCount + "</td>";
  row += "<td class=\"table-actions\"><a href=\"#\"><i class=\"fa-regular fa-pen-to-square\"></i></a><a href=\"#\"><i class=\"fa-regular fa-trash-can\"></i></a></td>";
  row += "</tr>";
  return row;
}

function renderAdminDashboard() {
  try {
    // ----- Stat cards -----
    var realStudents = getStudents();
    var allCourses = getAllCourses();
    var totalEnrollments = getTotalEnrollmentCount();

    var statStudents = document.getElementById("stat-total-students");
    var statCourses = document.getElementById("stat-total-courses");
    var statEnrollments = document.getElementById("stat-total-enrollments");

    if (statStudents !== null) {
      statStudents.textContent = realStudents.length;
    }
    if (statCourses !== null) {
      statCourses.textContent = allCourses.length;
    }
    if (statEnrollments !== null) {
      statEnrollments.textContent = totalEnrollments;
    }

    // ----- Student Management table -----
    var studentTableBody = document.getElementById("student-table-body");
    if (studentTableBody !== null) {
      var studentRows = "";

      if (realStudents.length > 0) {
        for (var i = 0; i < realStudents.length; i++) {
          studentRows += buildStudentRow({
            name: realStudents[i].name,
            id: realStudents[i].studentId,
            dept: realStudents[i].department,
            status: "active"
          });
        }
      } else {
        // no one has registered yet - show the sample data so the
        // page still looks the way it originally did
        for (var s = 0; s < studentsData.length; s++) {
          studentRows += buildStudentRow(studentsData[s]);
        }
      }
      studentTableBody.innerHTML = studentRows;
    }

    // ----- Course Management table -----
    var courseTableBody = document.getElementById("course-table-body");
    if (courseTableBody !== null) {
      var courseRows = "";
      for (var j = 0; j < allCourses.length; j++) {
        var enrolledCount = getEnrollmentCountForCourse(allCourses[j].code);
        courseRows += buildCourseRow(allCourses[j], enrolledCount);
      }
      courseTableBody.innerHTML = courseRows;
    }
  } catch (err) {
    console.log("Error while loading admin dashboard data: " + err);
  }
}

/* =====================================================================
   ADD NEW COURSE MODAL
   Built with JavaScript and the site's existing .field / .input-wrap
   classes (from forms.css) so it matches the current design language.
   ===================================================================== */

function openAddCourseModal() {
  if (document.getElementById("add-course-overlay") !== null) {
    return; // already open
  }

  var overlay = document.createElement("div");
  overlay.id = "add-course-overlay";
  overlay.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(20,16,12,0.6);display:flex;align-items:center;justify-content:center;z-index:999;padding:20px;";

  var box = document.createElement("div");
  box.className = "panel";
  box.style.cssText = "max-width:460px;width:100%;margin-bottom:0;max-height:90vh;overflow-y:auto;";

  box.innerHTML =
    '<div class="panel-head"><h3>Add New Course</h3></div>' +
    '<div class="field"><label for="nc-name">Course Name</label>' +
    '<div class="input-wrap"><i class="fa-solid fa-book"></i><input type="text" id="nc-name" placeholder="e.g. Cloud Computing"></div>' +
    '<span class="error-text" id="nc-name-error"></span></div>' +

    '<div class="field"><label for="nc-code">Course Code</label>' +
    '<div class="input-wrap"><i class="fa-solid fa-hashtag"></i><input type="text" id="nc-code" placeholder="e.g. CS-220"></div>' +
    '<span class="error-text" id="nc-code-error"></span></div>' +

    '<div class="field"><label for="nc-instructor">Instructor</label>' +
    '<div class="input-wrap"><i class="fa-regular fa-user"></i><input type="text" id="nc-instructor" placeholder="e.g. Dr. Leena Suri"></div>' +
    '<span class="error-text" id="nc-instructor-error"></span></div>' +

    '<div class="field"><label for="nc-duration">Duration</label>' +
    '<div class="input-wrap"><i class="fa-regular fa-clock"></i><input type="text" id="nc-duration" placeholder="e.g. 8 weeks"></div>' +
    '<span class="error-text" id="nc-duration-error"></span></div>' +

    '<div class="field"><label for="nc-level">Level</label>' +
    '<select id="nc-level"><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select>' +
    '<span class="error-text" id="nc-level-error"></span></div>' +

    '<div class="field"><label for="nc-desc">Description</label>' +
    '<div class="input-wrap"><i class="fa-regular fa-file-lines"></i><input type="text" id="nc-desc" placeholder="Short course description"></div>' +
    '<span class="error-text" id="nc-desc-error"></span></div>' +

    '<div class="form-success-msg" id="nc-msg"></div>' +

    '<div style="display:flex;gap:10px;margin-top:8px;">' +
    '<button type="button" class="btn btn-ghost btn-block" id="nc-cancel">Cancel</button>' +
    '<button type="button" class="btn btn-primary btn-block" id="nc-save">Save Course</button>' +
    '</div>';

  overlay.appendChild(box);
  document.body.appendChild(overlay);

  document.getElementById("nc-cancel").addEventListener("click", closeAddCourseModal);
  overlay.addEventListener("click", function (event) {
    if (event.target === overlay) {
      closeAddCourseModal();
    }
  });

  document.getElementById("nc-save").addEventListener("click", saveNewCourse);
}

function closeAddCourseModal() {
  var overlay = document.getElementById("add-course-overlay");
  if (overlay !== null) {
    overlay.parentNode.removeChild(overlay);
  }
}

function saveNewCourse() {
  var nameBox = document.getElementById("nc-name");
  var codeBox = document.getElementById("nc-code");
  var instructorBox = document.getElementById("nc-instructor");
  var durationBox = document.getElementById("nc-duration");
  var levelBox = document.getElementById("nc-level");
  var descBox = document.getElementById("nc-desc");

  var isFormValid = true;

  try {
    if (isEmpty(nameBox.value)) {
      showError(nameBox, "nc-name-error", "Course name is required.");
      isFormValid = false;
    } else {
      clearError(nameBox, "nc-name-error");
    }

    if (isEmpty(codeBox.value)) {
      showError(codeBox, "nc-code-error", "Course code is required.");
      isFormValid = false;
    } else {
      clearError(codeBox, "nc-code-error");
    }

    if (isEmpty(instructorBox.value)) {
      showError(instructorBox, "nc-instructor-error", "Instructor is required.");
      isFormValid = false;
    } else {
      clearError(instructorBox, "nc-instructor-error");
    }

    if (isEmpty(durationBox.value)) {
      showError(durationBox, "nc-duration-error", "Duration is required.");
      isFormValid = false;
    } else {
      clearError(durationBox, "nc-duration-error");
    }

    if (isEmpty(descBox.value)) {
      showError(descBox, "nc-desc-error", "A short description is required.");
      isFormValid = false;
    } else {
      clearError(descBox, "nc-desc-error");
    }
  } catch (err) {
    console.log("Add course validation error: " + err);
    isFormValid = false;
  }

  if (!isFormValid) {
    return;
  }

  // duplicate course name / code check
  if (findCourseByCode(codeBox.value) !== null) {
    showError(codeBox, "nc-code-error", "A course with this code already exists.");
    return;
  }
  if (courseNameExists(nameBox.value)) {
    showError(nameBox, "nc-name-error", "A course with this name already exists.");
    return;
  }

  var newCourse = {
    code: codeBox.value,
    name: nameBox.value,
    instructor: instructorBox.value,
    duration: durationBox.value,
    level: levelBox.value,
    icon: "fa-solid fa-graduation-cap",
    desc: descBox.value
  };

  addCourse(newCourse);

  var msgBox = document.getElementById("nc-msg");
  msgBox.textContent = "Course added successfully!";
  msgBox.style.display = "block";

  setTimeout(function () {
    closeAddCourseModal();
    renderAdminDashboard();
  }, 700);
}

document.addEventListener("DOMContentLoaded", function () {
  // this page is only for logged in admins
  var session = requireLogin("admin");
  if (session === null) {
    return;
  }

  renderAdminDashboard();

  var triggers = document.querySelectorAll(".add-course-trigger");
  for (var i = 0; i < triggers.length; i++) {
    triggers[i].addEventListener("click", function (event) {
      event.preventDefault();
      openAddCourseModal();
    });
  }
});
