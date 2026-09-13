/* =====================================================================
   DASHBOARD.JS
   Loads the currently logged in student's own details and their own
   enrolled courses from Local Storage and prints them on the
   Student Dashboard. Different students only ever see their own data.
   ===================================================================== */

function buildMiniCourse(course) {
  var row = "";
  row += '<div class="mini-course">';
  row += '  <div class="thumb"><i class="' + course.icon + '"></i></div>';
  row += '  <div class="info">';
  row += '    <h4>' + course.name + ' &mdash; ' + course.code + '</h4>';
  row += '    <div class="progress-bar"><span style="width:0%;"></span></div>';
  row += '  </div>';
  row += '  <span class="pct">0%</span>';
  row += '</div>';
  return row;
}

document.addEventListener("DOMContentLoaded", function () {
  try {

    // this page is only for logged in students - send anyone else
    // back to the Student Login page
    var session = requireLogin("student");
    if (session === null) {
      return;
    }

    var profile = findStudentByUsername(session.username);
    if (profile === null) {
      // account no longer exists in Local Storage
      clearSession();
      window.location.href = "student-login.html";
      return;
    }

    // fill the profile card
    document.getElementById("profile-name-value").textContent = profile.name;
    document.getElementById("profile-id-value").textContent = profile.studentId;
    document.getElementById("profile-email-value").textContent = profile.email;
    document.getElementById("profile-dept-value").textContent = profile.department;

    // update the welcome banner and topbar with the student's name
    document.getElementById("welcome-name").textContent = profile.name + ".";
    document.getElementById("topbar-student-name").textContent = profile.name;

    // ----- Enrolled Courses (each student sees only their own) -----
    var enrolledCodes = getEnrolledCourseCodes(session.username);
    var allCourses = getAllCourses();
    var enrolledCourses = [];

    for (var i = 0; i < enrolledCodes.length; i++) {
      for (var j = 0; j < allCourses.length; j++) {
        if (allCourses[j].code === enrolledCodes[i]) {
          enrolledCourses.push(allCourses[j]);
        }
      }
    }

    // "Enrolled Courses" stat card
    var enrolledCountBox = document.getElementById("stat-enrolled-count");
    if (enrolledCountBox !== null) {
      enrolledCountBox.textContent = enrolledCourses.length;
    }

    // "My Courses" panel
    var myCoursesBox = document.getElementById("my-courses-list");
    if (myCoursesBox !== null) {
      if (enrolledCourses.length === 0) {
        myCoursesBox.innerHTML = '<div class="placeholder-box">You have not enrolled in any courses yet. <a href="courses.html">Browse the catalog</a> to get started.</div>';
      } else {
        var coursesHTML = "";
        for (var k = 0; k < enrolledCourses.length; k++) {
          coursesHTML += buildMiniCourse(enrolledCourses[k]);
        }
        myCoursesBox.innerHTML = coursesHTML;
      }
    }

  } catch (err) {
    console.log("Error while loading student profile: " + err);
  }
});
