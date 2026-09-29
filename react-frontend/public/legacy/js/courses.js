/* =====================================================================
   COURSES.JS
   Reads the full course catalog (the original coursesData from
   data.js plus any courses an Admin has added in Local Storage) and
   prints the course cards on the page. Also wires up the Enroll
   button for the logged in student, using Local Storage so the
   enrollment is remembered after refresh, logout and login again.
   ===================================================================== */

function escCourse(value) {
  return String(value == null ? "" : value).replace(/[&<>]/g, function (c) {
    return {"&":"&amp;","<":"&lt;",">":"&gt;"}[c];
  });
}

function buildCourseCard(course, alreadyEnrolled) {
  var session = getSession();
  var completed = session && session.role === "student" ? isCourseCompleted(session.username, course.code) : false;
  var progress = session && session.role === "student" && alreadyEnrolled ? getCourseProgress(session.username, course.code).progress : 0;
  var saved = session && session.role === "student" ? isCourseSaved(session.username, course.code) : false;
  var saveHTML = session && session.role === "student" ? '<button type="button" class="save-course-btn" data-code="' + escCourse(course.code) + '" title="' + (saved ? "Remove from Saved Courses" : "Save Course") + '"><i class="fa-' + (saved ? "solid" : "regular") + ' fa-bookmark"></i></button>' : "";
  var buttonHTML = alreadyEnrolled
    ? '<a class="btn btn-primary btn-sm btn-block" href="/course-learning?course=' + encodeURIComponent(course.code) + '"><i class="fa-solid fa-book-open"></i> ' + (completed ? "Review Course" : "Learn Course") + '</a>'
    : '<button type="button" class="btn btn-primary btn-sm btn-block enroll-btn" data-code="' + escCourse(course.code) + '">Enroll</button>';

  return '<div class="course-card" data-course-name="' + escCourse(course.name.toLowerCase()) + '" data-course-level="' + escCourse(course.level.toLowerCase()) + '">' +
    '<div class="course-thumb"><span class="code-tag">' + escCourse(course.code) + '</span><span class="course-level">' + escCourse(course.level) + '</span><i class="' + escCourse(course.icon) + '"></i></div>' +
    '<div class="course-body"><div style="display:flex;align-items:center;justify-content:space-between;gap:8px"><h3 style="margin:0">' + escCourse(course.name) + '</h3>' + saveHTML + '</div>' +
    '<div class="course-meta"><span><i class="fa-regular fa-clock"></i> ' + escCourse(course.duration) + '</span><span><i class="fa-regular fa-user"></i> ' + escCourse(course.instructor) + '</span></div>' +
    '<p class="desc">' + escCourse(course.desc) + '</p>' +
    '<div class="progress-row"><div class="progress-label"><span>' + (completed ? "Completed" : (alreadyEnrolled ? "Enrolled" : "Not enrolled")) + '</span><span>' + progress + '%</span></div><div class="progress-bar"><span style="width:' + progress + '%;"></span></div></div>' +
    buttonHTML + '</div></div>';
}

function wireCourseFilters() {
  var search = document.getElementById("course-search");
  var level = document.getElementById("course-level-filter");
  var count = document.getElementById("course-result-count");
  function apply() {
    var query = (search ? search.value : "").trim().toLowerCase();
    var selected = (level ? level.value : "all").toLowerCase();
    var cards = document.querySelectorAll("#courses-container .course-card");
    var visible = 0;
    for (var i = 0; i < cards.length; i++) {
      var matchesName = !query || (cards[i].getAttribute("data-course-name") || "").indexOf(query) !== -1;
      var matchesLevel = selected === "all" || (cards[i].getAttribute("data-course-level") || "") === selected;
      cards[i].style.display = matchesName && matchesLevel ? "" : "none";
      if (matchesName && matchesLevel) visible++;
    }
    if (count) count.textContent = visible + (visible === 1 ? " course" : " courses") + " shown";
  }
  if (search) search.addEventListener("input", apply);
  if (level) level.addEventListener("change", apply);
  apply();
}

function handleEnrollClick(event) {
  var courseCode = event.currentTarget.getAttribute("data-code");
  var session = getSession();
  if (session === null || session.role !== "student") { appNavigate("/student-login"); return; }
  enrollStudentInCourse(session.username, courseCode);
  appNavigate("/enroll-placeholder?course=" + encodeURIComponent(courseCode));
}

function handleSaveCourse(event) {
  var session = getSession();
  if (!session || session.role !== "student") { appNavigate("/student-login"); return; }
  var button = event.currentTarget;
  var code = button.getAttribute("data-code");
  var saved = toggleSavedCourse(session.username, code);
  button.title = saved ? "Remove from Saved Courses" : "Save Course";
  button.innerHTML = '<i class="fa-' + (saved ? 'solid' : 'regular') + ' fa-bookmark"></i>';
}

document.addEventListener("DOMContentLoaded", function () {
  try {
    var container = document.getElementById("courses-container");
    if (container !== null) {
      var coursesList = getAllCourses();
      var session = getSession();
      var allCardsHTML = "";
      for (var i = 0; i < coursesList.length; i++) {
        var enrolled = session !== null && session.role === "student" ? isEnrolled(session.username, coursesList[i].code) : false;
        allCardsHTML += buildCourseCard(coursesList[i], enrolled);
      }
      container.innerHTML = allCardsHTML || '<div class="placeholder-box">No courses are available right now.</div>';
      var saveButtons = document.querySelectorAll(".save-course-btn");
      for (var sb = 0; sb < saveButtons.length; sb++) saveButtons[sb].addEventListener("click", handleSaveCourse);
      var enrollButtons = document.querySelectorAll(".enroll-btn");
      for (var j = 0; j < enrollButtons.length; j++) enrollButtons[j].addEventListener("click", handleEnrollClick);
      wireCourseFilters();
    }
  } catch (err) { console.log("Error while loading courses: " + err); }
});
