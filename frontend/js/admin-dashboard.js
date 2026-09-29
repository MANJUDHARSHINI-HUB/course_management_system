/* =====================================================================
   ADMIN-DASHBOARD.JS
   Fills the Student Management and Course Management tables, the
   stat cards, and the "Add New Course" modal, all using real data
   saved in Local Storage (falling back to the original sample data
   from data.js so the page still looks right before anyone has
   registered or added anything yet).
   ===================================================================== */

function buildStudentRow(student) {
  var active = student.active === true;
  var statusText = active ? "Logged In" : "Offline";
  var statusClass = active ? "active" : "inactive";
  var action = active ? '<button type="button" class="btn btn-ghost btn-sm force-logout-student" data-username="' + student.username + '"><i class="fa-solid fa-right-from-bracket"></i> Logout</button>' : '<span class="muted-action">Not logged in</span>';
  var loginDetails = student.activeRecord ? '<small style="color:var(--muted-dim);display:block;margin-top:4px;">Login: ' + new Date(student.activeRecord.loggedInAt).toLocaleString() + '<br>Last active: ' + new Date(student.activeRecord.lastSeen).toLocaleTimeString() + '</small>' : '<small style="color:var(--muted-dim);display:block;margin-top:4px;">Not currently logged in</small>';
  return '<tr><td>' + student.name + '<br><small style="color:var(--muted-dim);">' + student.id + '</small><br><small style="color:var(--muted-dim);">' + student.email + '</small>' + loginDetails + '</td><td>' + student.dept + '</td><td><strong>' + student.enrolledCount + '</strong> enrolled<br><small style="color:var(--muted-dim);">' + student.completedCount + ' completed</small></td><td><span class="pill ' + statusClass + '">' + statusText + '</span></td><td class="table-actions">' + action + '</td></tr>';
}

function buildCourseRow(course, enrolledCount) {
  var isCustom = getExtraCourses().some(function (item) { return item.code.trim().toLowerCase() === course.code.trim().toLowerCase(); });
  var action = isCustom ? '<button type="button" class="btn btn-ghost btn-sm edit-course" data-code="' + course.code + '"><i class="fa-regular fa-pen-to-square"></i> Edit</button> <button type="button" class="btn btn-ghost btn-sm delete-course" data-code="' + course.code + '"><i class="fa-regular fa-trash-can"></i> Delete</button>' : '<span class="muted-action">Catalog course</span>';
  return '<tr><td>' + course.name + '<br><small style="color:var(--muted-dim);">' + course.code + '</small></td><td>' + course.instructor + '</td><td>' + enrolledCount + '</td><td class="table-actions">' + action + '</td></tr>';
}

function renderAdminDashboard() {
  try {
    // ----- Stat cards -----
    var realStudents = getStudents();
    var allCourses = getAllCourses();
    var totalEnrollments = getTotalEnrollmentCount();
    var totalCompleted = getTotalCompletedCourseCount();

    var statStudents = document.getElementById("stat-total-students");
    var statCourses = document.getElementById("stat-total-courses");
    var statEnrollments = document.getElementById("stat-total-enrollments");
    var statCertificates = document.getElementById("stat-certificates-issued");

    if (statStudents !== null) {
      statStudents.textContent = realStudents.length;
    }
    if (statCourses !== null) {
      statCourses.textContent = allCourses.length;
    }
    if (statEnrollments !== null) { statEnrollments.textContent = totalEnrollments; }
    if (statCertificates !== null) { statCertificates.textContent = totalCompleted; }
    if (statCertificates !== null) {
      statCertificates.textContent = totalCompleted;
    }

    // ----- Reports (calculated from real local data) -----
    var enrollmentMap = getEnrollments();
    var enrolledStudentCount = 0;
    for (var enrollmentKey in enrollmentMap) {
      if (enrollmentMap.hasOwnProperty(enrollmentKey) && enrollmentMap[enrollmentKey].length > 0) enrolledStudentCount++;
    }
    var enrollmentCoverage = realStudents.length > 0 ? Math.round((enrolledStudentCount / realStudents.length) * 100) : 0;
    var completionRate = totalEnrollments > 0 ? Math.round((totalCompleted / totalEnrollments) * 100) : 0;
    var certificateRate = totalEnrollments > 0 ? Math.round((totalCompleted / totalEnrollments) * 100) : 0;
    var reportValues = [
      ["report-enrollment", "report-enrollment-bar", enrollmentCoverage],
      ["report-completion", "report-completion-bar", completionRate],
      ["report-certificates", "report-certificates-bar", certificateRate]
    ];
    for (var rv = 0; rv < reportValues.length; rv++) {
      var valueNode = document.getElementById(reportValues[rv][0]);
      var barNode = document.getElementById(reportValues[rv][1]);
      if (valueNode) valueNode.textContent = reportValues[rv][2] + "%";
      if (barNode) barNode.style.width = reportValues[rv][2] + "%";
    }

    // ----- Student Management table -----
    var studentTableBody = document.getElementById("student-table-body");
    var studentPanel = studentTableBody ? studentTableBody.closest(".panel") : null;
    if (studentPanel && !document.getElementById("admin-student-search")) { var sh = document.createElement("div"); sh.style.marginBottom="12px"; sh.innerHTML='<div class="input-wrap"><i class="fa-solid fa-magnifying-glass"></i><input id="admin-student-search" type="search" placeholder="Search students by name, ID or email..."></div>'; studentPanel.insertBefore(sh, studentTableBody.closest("table")); }
    if (studentTableBody !== null) {
      var studentRows = "";

      if (realStudents.length > 0) {
        for (var i = 0; i < realStudents.length; i++) {
          var studentKey = realStudents[i].username.trim().toLowerCase();
          var activeStudents = getActiveStudents();
          var isActive = false;
          var activeRecord = null;
          for (var ai = 0; ai < activeStudents.length; ai++) {
            if (activeStudents[ai].username === studentKey && (!activeStudents[ai].lastSeen || Date.now() - activeStudents[ai].lastSeen < 8000)) {
              isActive = true;
              activeRecord = activeStudents[ai];
              break;
            }
          }
          studentRows += buildStudentRow({
            name: realStudents[i].name,
            id: realStudents[i].studentId,
            email: realStudents[i].email,
            dept: realStudents[i].department,
            username: realStudents[i].username,
            enrolledCount: getEnrolledCourseCodes(realStudents[i].username).length,
            completedCount: getCompletedCourseCountForStudent(realStudents[i].username),
            active: isActive,
            activeRecord: activeRecord
          });
        }
      } else {
        studentRows = '<tr><td colspan="5"><div class="placeholder-box">No registered students yet. New student accounts will appear here automatically.</div></td></tr>';
      }
      studentTableBody.innerHTML = studentRows;
      var searchBox=document.getElementById("admin-student-search"); if(searchBox && !searchBox.dataset.wired){searchBox.dataset.wired="1";searchBox.addEventListener("input",function(){var q=this.value.toLowerCase();studentTableBody.querySelectorAll("tr").forEach(function(row){row.style.display=!q||row.textContent.toLowerCase().indexOf(q)!==-1?"":"none";});});}
    }

    // ----- Course Management table -----
    var courseTableBody = document.getElementById("course-table-body");
    if (courseTableBody !== null) {
      var courseRows = "";
      if (allCourses.length === 0) {
        courseRows = '<tr><td colspan="4"><div class="placeholder-box">No courses available yet.</div></td></tr>';
      } else {
        for (var j = 0; j < allCourses.length; j++) {
          var enrolledCount = getEnrollmentCountForCourse(allCourses[j].code);
          courseRows += buildCourseRow(allCourses[j], enrolledCount);
        }
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

  if (findCourseByCode(codeBox.value) !== null) {
    showError(codeBox, "nc-code-error", "A course with this code already exists.");
    return;
  }
  if (courseNameExists(nameBox.value)) {
    showError(nameBox, "nc-name-error", "A course with this name already exists.");
    return;
  }

  var newCourse = {
    courseName: nameBox.value.trim(), name: nameBox.value.trim(),
    courseCode: codeBox.value.trim(), code: codeBox.value.trim(),
    instructor: instructorBox.value.trim(), duration: durationBox.value.trim(),
    level: levelBox.value, category: "General", status: "Active",
    image: "https://cdn-icons-png.flaticon.com/512/3135/3135755.png",
    icon: "fa-solid fa-graduation-cap", overview: descBox.value.trim(), desc: descBox.value.trim(),
    learningOutcomes: [], modules: [], enrollmentCount: 0, averageRating: 0
  };

  var msgBox = document.getElementById("nc-msg");
  msgBox.textContent = "Saving course...";
  msgBox.style.display = "block";
  fetch("http://localhost:5000/courses", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify(newCourse) })
    .then(function(response){ if(!response.ok) throw new Error("Save failed"); return response.json(); })
    .then(function(){ msgBox.textContent = "Course added successfully!"; setTimeout(function(){ closeAddCourseModal(); renderAdminDashboard(); }, 700); })
    .catch(function(){ msgBox.textContent = "Unable to save the course. Please make sure the Mock API is running on port 5000."; });
}

function editExtraCourse(code){var course=findCourseByCode(code);if(!course||!getExtraCourses().some(function(x){return x.code.toLowerCase()===code.toLowerCase();}))return;var name=prompt("Course name:",course.name);if(name===null)return;var instructor=prompt("Instructor:",course.instructor);if(instructor===null)return;var duration=prompt("Duration:",course.duration);if(duration===null)return;var level=prompt("Level (Beginner / Intermediate / Advanced):",course.level);if(level===null)return;var desc=prompt("Description:",course.desc);if(desc===null)return;var extra=getExtraCourses();for(var i=0;i<extra.length;i++){if(extra[i].code.toLowerCase()===code.toLowerCase()){extra[i].name=name.trim()||extra[i].name;extra[i].instructor=instructor.trim()||extra[i].instructor;extra[i].duration=duration.trim()||extra[i].duration;extra[i].level=["Beginner","Intermediate","Advanced"].indexOf(level.trim())>=0?level.trim():extra[i].level;extra[i].desc=desc.trim()||extra[i].desc;}}saveExtraCourses(extra);renderAdminDashboard();}

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

  document.addEventListener("click", function (event) {
    var editButton = event.target.closest ? event.target.closest(".edit-course") : null; if(editButton){event.preventDefault();editExtraCourse(editButton.getAttribute("data-code"));return;}
    var deleteButton = event.target.closest ? event.target.closest(".delete-course") : null;
    if (deleteButton) {
      event.preventDefault();
      var code = deleteButton.getAttribute("data-code");
      if (code && window.confirm("Delete this admin-added course? Existing enrollments for this course will also be removed.")) { deleteExtraCourse(code); renderAdminDashboard(); }
      return;
    }
    var button = event.target.closest ? event.target.closest(".force-logout-student") : null;
    if (!button) return;
    var username = button.getAttribute("data-username");
    if (!username) return;
    forceLogoutStudent(username);
    renderAdminDashboard();
  });

  window.setInterval(function () {
    renderAdminDashboard();
  }, 2000);
});
