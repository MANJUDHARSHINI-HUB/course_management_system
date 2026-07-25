/* =====================================================================
   ADMIN-DASHBOARD.JS
   Fills the Student Management and Course Management tables using
   the JSON arrays from data.js, instead of hard-coded table rows.
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

document.addEventListener("DOMContentLoaded", function () {
  try {
    // ----- Student Management table -----
    var studentTableBody = document.getElementById("student-table-body");
    if (studentTableBody !== null) {
      var studentRows = "";
      for (var i = 0; i < studentsData.length; i++) {
        studentRows += buildStudentRow(studentsData[i]);
      }
      studentTableBody.innerHTML = studentRows;
    }

    // ----- Course Management table -----
    // (only showing the first 3 courses here, same as the original design)
    var courseTableBody = document.getElementById("course-table-body");
    if (courseTableBody !== null) {
      // same 3 courses shown in the original design: HTML, Data
      // Structures and Artificial Intelligence
      var featuredCodes = ["CS-101", "CS-210", "AI-310"];
      var enrolledNumbers = [512, 398, 276];
      var courseRows = "";

      for (var j = 0; j < featuredCodes.length; j++) {
        for (var k = 0; k < coursesData.length; k++) {
          if (coursesData[k].code === featuredCodes[j]) {
            courseRows += buildCourseRow(coursesData[k], enrolledNumbers[j]);
          }
        }
      }
      courseTableBody.innerHTML = courseRows;
    }
  } catch (err) {
    console.log("Error while loading admin dashboard data: " + err);
  }
});
