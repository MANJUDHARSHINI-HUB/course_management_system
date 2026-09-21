/* =====================================================================
   COURSE-LEARNING.JS
   Learning workspace for an enrolled student. It provides simple reading
   material, a video-learning option and a Complete Course action while
   keeping completion/progress in Local Storage.
   ===================================================================== */

function getLearningResource(course) {
  var name = course.name.toLowerCase();
  var links = {
    "html": "https://developer.mozilla.org/en-US/docs/Web/HTML",
    "css": "https://developer.mozilla.org/en-US/docs/Web/CSS",
    "javascript": "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    "python": "https://docs.python.org/3/tutorial/",
    "java": "https://dev.java/learn/",
    "c++": "https://cplusplus.com/doc/tutorial/",
    "dbms": "https://www.postgresql.org/docs/current/tutorial.html",
    "data structures": "https://www.geeksforgeeks.org/data-structures/",
    "artificial intelligence": "https://developers.google.com/machine-learning/crash-course",
    "machine learning": "https://developers.google.com/machine-learning/crash-course"
  };
  return links[name] || "https://developer.mozilla.org/";
}

function renderCourseLearning() {
  var session = getSession();
  if (!session || session.role !== "student") {
    appNavigate("/student-login");
    return;
  }

  var params = new URLSearchParams(window.location.search);
  var code = params.get("course");
  var course = code ? findCourseByCode(code) : null;
  if (!course || !isEnrolled(session.username, course.code)) {
    appNavigate("/courses");
    return;
  }

  var profile = findStudentByUsername(session.username);
  var data = getCourseProgress(session.username, course.code);
  document.getElementById("learning-course-title").textContent = course.name;
  document.getElementById("learning-course-code").textContent = course.code;
  document.getElementById("learning-course-desc").textContent = course.desc;
  document.getElementById("learning-instructor").textContent = course.instructor;
  document.getElementById("learning-student").textContent = profile ? profile.name : session.username;
  document.getElementById("learning-progress").textContent = data.progress + "%";
  document.getElementById("learning-progress-badge").textContent = data.progress + "%";
  document.getElementById("learning-progress-bar").style.width = data.progress + "%";

  var readBtn = document.getElementById("reading-resource");
  readBtn.href = getLearningResource(course);
  readBtn.target = "_blank";

  var videoBtn = document.getElementById("video-resource");
  videoBtn.href = "https://www.youtube.com/results?search_query=" + encodeURIComponent(course.name + " tutorial");
  videoBtn.target = "_blank";

  var completeBtn = document.getElementById("complete-course-btn");
  if (data.completed) {
    completeBtn.disabled = true;
    completeBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Course Completed';
    completeBtn.classList.add("btn-ghost");
  } else {
    completeBtn.addEventListener("click", function () {
      markCourseComplete(session.username, course.code);
      data = getCourseProgress(session.username, course.code);
      document.getElementById("learning-progress").textContent = "100%";
      document.getElementById("learning-progress-badge").textContent = "100%";
      document.getElementById("learning-progress-bar").style.width = "100%";
      completeBtn.disabled = true;
      completeBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Course Completed';
      var msg = document.getElementById("completion-message");
      msg.textContent = "Course completed successfully. You can now choose another course from the catalog.";
      msg.style.display = "block";
    });
  }
}

document.addEventListener("DOMContentLoaded", renderCourseLearning);
