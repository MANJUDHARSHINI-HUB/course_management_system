/* =====================================================================
   DASHBOARD.JS
   Loads the currently logged in student's own details and their own
   enrolled courses from Local Storage and prints them on the
   Student Dashboard. Different students only ever see their own data.
   ===================================================================== */

function buildMiniCourse(course, username) {
  var progressInfo = getCourseProgress(username, course.code);
  var progress = Number(progressInfo.progress) || 0;
  progress = Math.max(0, Math.min(100, progress));
  var row = "";
  row += '<div class="mini-course">';
  row += '  <div class="thumb"><i class="' + course.icon + '"></i></div>';
  row += '  <div class="info">';
  row += '    <h4>' + course.name + ' &mdash; ' + course.code + '</h4>';
  row += '    <div class="progress-bar"><span style="width:' + progress + '%;"></span></div>';
  row += '  </div>';
  row += '  <span class="pct">' + progress + '%</span>';
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
      appNavigate("/student-login");
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

    // "Enrolled Courses" and progress stats
    var enrolledCountBox = document.getElementById("stat-enrolled-count");
    var ongoingCountBox = document.getElementById("stat-ongoing-count");
    var completedCountBox = document.getElementById("stat-completed-count");
    var certificatesCountBox = document.getElementById("stat-certificates-count");
    var completedCount = 0;
    for (var ec = 0; ec < enrolledCourses.length; ec++) {
      if (isCourseCompleted(session.username, enrolledCourses[ec].code)) completedCount++;
    }
    if (enrolledCountBox !== null) enrolledCountBox.textContent = enrolledCourses.length;
    if (completedCountBox !== null) completedCountBox.textContent = completedCount;
    if (ongoingCountBox !== null) ongoingCountBox.textContent = Math.max(0, enrolledCourses.length - completedCount);
    if (certificatesCountBox !== null) certificatesCountBox.textContent = completedCount;

    // "My Courses" panel
    var myCoursesBox = document.getElementById("my-courses-list");
    if (myCoursesBox !== null) {
      if (enrolledCourses.length === 0) {
        myCoursesBox.innerHTML = '<div class="placeholder-box">You have not enrolled in any courses yet. <a href="/courses">Browse the catalog</a> to get started.</div>';
      } else {
        var coursesHTML = "";
        for (var k = 0; k < enrolledCourses.length; k++) {
          coursesHTML += buildMiniCourse(enrolledCourses[k], session.username);
        }
        myCoursesBox.innerHTML = coursesHTML;
      }
    }

  } catch (err) {
    console.log("Error while loading student profile: " + err);
  }
});
