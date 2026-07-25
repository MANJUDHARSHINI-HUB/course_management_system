/* =====================================================================
   COURSES.JS
   Reads the course data (JSON array from data.js) and prints the
   course cards on the page using simple DOM manipulation, instead
   of typing every card by hand in the HTML.
   ===================================================================== */

function buildCourseCard(course) {
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
  card += '    <div class="progress-row"><div class="progress-label"><span>Not enrolled</span><span>0%</span></div><div class="progress-bar"><span style="width:0%;"></span></div></div>';
  card += '    <a href="enroll-placeholder.html" class="btn btn-primary btn-sm btn-block">Enroll</a>';
  card += '  </div>';
  card += '</div>';
  return card;
}

document.addEventListener("DOMContentLoaded", function () {
  try {
    var container = document.getElementById("courses-container");

    if (container !== null) {
      // In a real project this JSON data usually comes from a server
      // as a plain string. Here we convert our array to a JSON string
      // and then parse it again, just to practice JSON.stringify() and
      // JSON.parse() as shown in the faculty notes.
      var coursesJSON = JSON.stringify(coursesData);
      var coursesList = JSON.parse(coursesJSON);

      var allCardsHTML = "";
      for (var i = 0; i < coursesList.length; i++) {
        allCardsHTML += buildCourseCard(coursesList[i]);
      }

      container.innerHTML = allCardsHTML;
    }
  } catch (err) {
    console.log("Error while loading courses: " + err);
  }
});
