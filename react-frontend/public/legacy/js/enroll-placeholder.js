document.addEventListener("DOMContentLoaded", function () {
  try {
    var params = new URLSearchParams(window.location.search);
    var courseCode = params.get("course");
    if (!courseCode) return;
    var session = getSession();
    if (!session || session.role !== "student") { appNavigate("/student-login"); return; }
    var course = findCourseByCode(courseCode);
    var headingBox = document.getElementById("enroll-status-heading");
    var textBox = document.getElementById("enroll-status-text");
    var iconBox = document.getElementById("enroll-status-icon");
    if (!course) return;
    enrollStudentInCourse(session.username, course.code);
    headingBox.textContent = "You're enrolled!";
    textBox.textContent = '"' + course.name + '" (' + course.code + ') has been added to your enrolled courses. You can see it any time on your Student Dashboard.';
    iconBox.className = "status-icon";
    iconBox.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
  } catch (err) { console.log("Error showing enrollment confirmation: " + err); }
});
