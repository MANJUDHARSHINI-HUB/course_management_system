/* =====================================================================
   COURSES.JS
   Reads the full course catalog (the original coursesData from
   data.js plus any courses an Admin has added in Local Storage) and
   prints the course cards on the page. Also wires up the Enroll
   button for the logged in student, using Local Storage so the
   enrollment is remembered after refresh, logout and login again.
   ===================================================================== */

function buildCourseCard(course, alreadyEnrolled) {
  var session = getSession();
  var completed = session && session.role === "student" ? isCourseCompleted(session.username, course.code) : false;
  var buttonHTML;
  if (alreadyEnrolled) {
    buttonHTML = '<a class="btn btn-primary btn-sm btn-block" href="/course-learning?course=' + encodeURIComponent(course.code) + '"><i class="fa-solid fa-book-open"></i> ' + (completed ? "Review Course" : "Learn Course") + '</a>';
  } else {
    buttonHTML = '<button type="button" class="btn btn-primary btn-sm btn-block enroll-btn" data-code="' + course.code + '">Enroll</button>';
  }

  // build one course card as an HTML string using the JSON object
  var card = "";
  card += '<div class="course-card">';
  card += '  <div class="course-thumb">';
  card += '    <span class="code-tag">' + course.code + '</span>';
  card += '    <span class="course-level">' + course.level + '</span>';
  card += '    <i class="' + course.icon + '"></i>';
  card += '  </div>';
  card += '  <div class="course-body">';
  card += '    <h3>' + course.name + '</h3>';
  card += '    <div class="course-meta"><span><i class="fa-regular fa-clock"></i> ' + course.duration + '</span><span><i class="fa-regular fa-user"></i> ' + course.instructor + '</span></div>';
  card += '    <p class="desc">' + course.desc + '</p>';
  var progress = session && session.role === "student" && alreadyEnrolled ? getCourseProgress(session.username, course.code).progress : 0;
  card += '    <div class="progress-row"><div class="progress-label"><span>' + (completed ? "Completed" : (alreadyEnrolled ? "Enrolled" : "Not enrolled")) + '</span><span>' + progress + '%</span></div><div class="progress-bar"><span style="width:' + progress + '%;"></span></div></div>';
  card += '    ' + buttonHTML;
  card += '  </div>';
  card += '</div>';
  return card;
}

function handleEnrollClick(event) {
  var courseCode = event.currentTarget.getAttribute("data-code");
  var session = getSession();

  // Enrollment requires a logged in student
  if (session === null || session.role !== "student") {
    appNavigate("/student-login");
    return;
  }

  var added = enrollStudentInCourse(session.username, courseCode);

  if (!added) {
    // already enrolled somehow (e.g. two tabs open) - just go to the
    // confirmation screen without duplicating the enrollment
  }

  appNavigate("/enroll-placeholder?course=" + encodeURIComponent(courseCode));
}

document.addEventListener("DOMContentLoaded", function () {
  try {
    var container = document.getElementById("courses-container");

    if (container !== null) {
      // full catalog = original courses + anything the Admin added,
      // merged together by getAllCourses() in storage.js
      var coursesList = getAllCourses();
      var session = getSession();

      var allCardsHTML = "";
      for (var i = 0; i < coursesList.length; i++) {
        var alreadyEnrolled = (session !== null && session.role === "student") ?
          isEnrolled(session.username, coursesList[i].code) : false;
        allCardsHTML += buildCourseCard(coursesList[i], alreadyEnrolled);
      }

      container.innerHTML = allCardsHTML;

      // wire up every Enroll button
      var enrollButtons = document.querySelectorAll(".enroll-btn");
      for (var j = 0; j < enrollButtons.length; j++) {
        enrollButtons[j].addEventListener("click", handleEnrollClick);
      }
    }
  } catch (err) {
    console.log("Error while loading courses: " + err);
  }
});
