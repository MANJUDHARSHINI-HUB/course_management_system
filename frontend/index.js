/* =====================================================================
   INDEX.JS
   Prints the "Featured Courses" cards on the homepage using the
   same JSON course data used on courses.html, so we don't repeat
   the same course details in two different files.
   ===================================================================== */

function buildFeaturedCard(course) {
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
  card += '    <a href="courses.html" class="btn btn-ghost btn-sm btn-block">View Course</a>';
  card += '  </div>';
  card += '</div>';
  return card;
}

document.addEventListener("DOMContentLoaded", function () {
  try {
    var container = document.getElementById("featured-courses-container");

    if (container !== null) {
      // these are the same 3 courses that were originally featured
      // on the homepage: HTML, Data Structures and AI
      var featuredCodes = ["CS-101", "CS-210", "AI-310"];
      var featuredHTML = "";

      for (var i = 0; i < featuredCodes.length; i++) {
        for (var j = 0; j < coursesData.length; j++) {
          if (coursesData[j].code === featuredCodes[i]) {
            featuredHTML += buildFeaturedCard(coursesData[j]);
          }
        }
      }
      container.innerHTML = featuredHTML;
    }
  } catch (err) {
    console.log("Error while loading featured courses: " + err);
  }
});
