/* Admin dashboard backed by the Mock API. The existing EduLedger UI is kept unchanged. */
var MOCK_API = "http://localhost:5000";
var adminApiCourses = [];
var adminApiStudents = [];
var adminApiEnrollments = [];

function apiJSON(path, options) {
  return fetch(MOCK_API + path, Object.assign({ headers: { "Content-Type": "application/json" } }, options || {})).then(function (r) {
    if (!r.ok) throw new Error("API request failed: " + r.status);
    return r.json();
  });
}

function normalizeCourse(c) {
  return Object.assign({}, c, { id: String(c.id), name: c.courseName || c.name, code: c.courseCode || c.code, desc: c.overview || c.desc, icon: c.icon || "fa-solid fa-graduation-cap" });
}
function cacheApiCourses(list) { try { localStorage.setItem("eduledger_api_courses", JSON.stringify(list)); } catch (e) {} }
function cacheApiStudents(list) { try { localStorage.setItem("eduledger_api_students", JSON.stringify(list)); } catch (e) {} }
function cacheApiAdmins(list) { try { localStorage.setItem("eduledger_api_admins", JSON.stringify(list)); } catch (e) {} }

function buildStudentRow(student) {
  var username = student.username || student.email || "";
  var enrolledCount = adminApiEnrollments.filter(function (e) { return String(e.studentUsername || e.username || "").toLowerCase() === username.toLowerCase(); }).length;
  return '<tr><td>' + (student.name || "") + '<br><small style="color:var(--muted-dim);">' + (student.studentId || student.id || "") + '</small><br><small style="color:var(--muted-dim);">' + (student.email || username) + '</small></td><td>' + (student.department || student.dept || "Computer Science") + '</td><td><strong>' + enrolledCount + '</strong> enrolled</td><td><span class="pill active">Active</span></td><td class="table-actions"><span class="muted-action">API account</span></td></tr>';
}
function buildCourseRow(course) {
  var custom = Number(course.id) > 18;
  var actions = custom ? '<button type="button" class="btn btn-ghost btn-sm edit-course" data-id="' + course.id + '"><i class="fa-regular fa-pen-to-square"></i> Edit</button> <button type="button" class="btn btn-ghost btn-sm delete-course" data-id="' + course.id + '"><i class="fa-regular fa-trash-can"></i> Delete</button>' : '<span class="muted-action">Catalog course</span>';
  return '<tr><td>' + (course.name || course.courseName) + '<br><small style="color:var(--muted-dim);">' + (course.code || course.courseCode) + '</small></td><td>' + (course.instructor || "") + '</td><td>' + (course.enrollmentCount || 0) + '</td><td class="table-actions">' + actions + '</td></tr>';
}

async function refreshAdminData() {
  try {
    var results = await Promise.all([apiJSON("/students"), apiJSON("/admins"), apiJSON("/courses"), apiJSON("/enrollments")]);
    adminApiStudents = results[0] || [];
    cacheApiStudents(adminApiStudents);
    cacheApiAdmins(results[1] || []);
    adminApiCourses = (results[2] || []).map(normalizeCourse);
    adminApiEnrollments = results[3] || [];
    cacheApiCourses(adminApiCourses);
    renderAdminDashboard();
  } catch (error) {
    console.error(error);
    renderAdminDashboard(true);
  }
}

function renderAdminDashboard(apiError) {
  var students = adminApiStudents.length ? adminApiStudents : getStudents();
  var courses = adminApiCourses.length ? adminApiCourses : getAllCourses();
  var enrollments = adminApiEnrollments.length ? adminApiEnrollments : [];
  var totalStudents = document.getElementById("stat-total-students");
  var totalCourses = document.getElementById("stat-total-courses");
  var totalEnrollments = document.getElementById("stat-total-enrollments");
  var certificates = document.getElementById("stat-certificates-issued");
  if (totalStudents) totalStudents.textContent = students.length;
  if (totalCourses) totalCourses.textContent = courses.length;
  if (totalEnrollments) totalEnrollments.textContent = enrollments.length;
  if (certificates) certificates.textContent = enrollments.filter(function (e) { return Number(e.progress || 0) >= 100 || e.completed === true; }).length;

  var studentBody = document.getElementById("student-table-body");
  if (studentBody) studentBody.innerHTML = students.length ? students.map(buildStudentRow).join("") : '<tr><td colspan="5"><div class="placeholder-box">No registered students yet.</div></td></tr>';
  var courseBody = document.getElementById("course-table-body");
  if (courseBody) courseBody.innerHTML = courses.length ? courses.map(buildCourseRow).join("") : '<tr><td colspan="4"><div class="placeholder-box">No courses available yet.</div></td></tr>';

  var coverage = students.length ? Math.round(new Set(enrollments.map(function(e){return e.studentUsername || e.username;})).size / students.length * 100) : 0;
  var completion = enrollments.length ? Math.round(enrollments.filter(function(e){return Number(e.progress||0)>=100 || e.completed===true;}).length / enrollments.length * 100) : 0;
  [["report-enrollment","report-enrollment-bar",coverage],["report-completion","report-completion-bar",completion],["report-certificates","report-certificates-bar",completion]].forEach(function(x){var n=document.getElementById(x[0]);var b=document.getElementById(x[1]);if(n)n.textContent=x[2]+"%";if(b)b.style.width=x[2]+"%";});
  if (apiError) {
    var table = document.getElementById("course-table-body");
    if (table && !document.getElementById("admin-api-warning")) { var tr=document.createElement("tr");tr.id="admin-api-warning";tr.innerHTML='<td colspan="4"><div class="placeholder-box">Unable to load Mock API data. Start the server on port 5000.</div></td>';table.prepend(tr); }
  }
}

function openAddCourseModal() {
  if (document.getElementById("add-course-overlay")) return;
  var overlay=document.createElement("div"); overlay.id="add-course-overlay"; overlay.style.cssText="position:fixed;inset:0;background:rgba(20,16,12,.6);display:flex;align-items:center;justify-content:center;z-index:999;padding:20px;";
  var box=document.createElement("div"); box.className="panel"; box.style.cssText="max-width:460px;width:100%;margin:0;max-height:90vh;overflow-y:auto;";
  box.innerHTML='<div class="panel-head"><h3>Add New Course</h3></div>'+
  '<div class="field"><label>Course Name</label><div class="input-wrap"><i class="fa-solid fa-book"></i><input id="nc-name" placeholder="e.g. Cloud Computing"></div><span class="error-text" id="nc-name-error"></span></div>'+
  '<div class="field"><label>Course Code</label><div class="input-wrap"><i class="fa-solid fa-hashtag"></i><input id="nc-code" placeholder="e.g. CS-280"></div><span class="error-text" id="nc-code-error"></span></div>'+
  '<div class="field"><label>Instructor</label><div class="input-wrap"><i class="fa-regular fa-user"></i><input id="nc-instructor" placeholder="e.g. Dr. Leena Suri"></div><span class="error-text" id="nc-instructor-error"></span></div>'+
  '<div class="field"><label>Duration</label><div class="input-wrap"><i class="fa-regular fa-clock"></i><input id="nc-duration" placeholder="e.g. 8 weeks"></div><span class="error-text" id="nc-duration-error"></span></div>'+
  '<div class="field"><label>Level</label><select id="nc-level"><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></div>'+
  '<div class="field"><label>Description</label><div class="input-wrap"><i class="fa-regular fa-file-lines"></i><input id="nc-desc" placeholder="Short course description"></div><span class="error-text" id="nc-desc-error"></span></div>'+
  '<div class="form-success-msg" id="nc-msg"></div><div style="display:flex;gap:10px;margin-top:8px"><button class="btn btn-ghost btn-block" id="nc-cancel">Cancel</button><button class="btn btn-primary btn-block" id="nc-save">Save Course</button></div>';
  overlay.appendChild(box); document.body.appendChild(overlay); document.getElementById("nc-cancel").onclick=closeAddCourseModal; overlay.onclick=function(e){if(e.target===overlay)closeAddCourseModal();}; document.getElementById("nc-save").onclick=saveNewCourse;
}
function closeAddCourseModal(){var x=document.getElementById("add-course-overlay");if(x)x.remove();}
async function saveNewCourse(){
  var name=document.getElementById("nc-name").value.trim(), code=document.getElementById("nc-code").value.trim(), instructor=document.getElementById("nc-instructor").value.trim(), duration=document.getElementById("nc-duration").value.trim(), level=document.getElementById("nc-level").value, desc=document.getElementById("nc-desc").value.trim();
  if(!name||!code||!instructor||!duration||!desc){document.getElementById("nc-msg").textContent="Please fill all required fields.";document.getElementById("nc-msg").style.display="block";return;}
  if(adminApiCourses.some(function(c){return String(c.code).toLowerCase()===code.toLowerCase()||String(c.name).toLowerCase()===name.toLowerCase();})){document.getElementById("nc-msg").textContent="Course name or code already exists.";document.getElementById("nc-msg").style.display="block";return;}
  var course={courseName:name,courseCode:code,name:name,code:code,instructor:instructor,duration:duration,level:level,category:"General",image:"https://cdn-icons-png.flaticon.com/512/3135/3135755.png",icon:"fa-solid fa-graduation-cap",status:"Active",overview:desc,desc:desc,learningOutcomes:["Understand course fundamentals","Practice core concepts","Apply the concepts in exercises","Build a small project"],modules:["Introduction","Core Concepts","Practical Exercises","Project","Review"],enrollmentCount:0,averageRating:0};
  try { await apiJSON("/courses",{method:"POST",body:JSON.stringify(course)}); document.getElementById("nc-msg").textContent="Course added successfully!";document.getElementById("nc-msg").style.display="block"; await refreshAdminData(); setTimeout(closeAddCourseModal,500); } catch(e){document.getElementById("nc-msg").textContent="Unable to add course. Check the Mock API.";document.getElementById("nc-msg").style.display="block";}
}
async function editCourse(id){
  var c=adminApiCourses.find(function(x){return String(x.id)===String(id);}); if(!c)return;
  var name=prompt("Course name:",c.name); if(name===null)return; var instructor=prompt("Instructor:",c.instructor);if(instructor===null)return;var duration=prompt("Duration:",c.duration);if(duration===null)return;var level=prompt("Level (Beginner / Intermediate / Advanced):",c.level);if(level===null)return;var desc=prompt("Description:",c.desc);if(desc===null)return;
  var updated=Object.assign({},c,{courseName:name.trim()||c.name,courseCode:c.code,name:name.trim()||c.name,code:c.code,instructor:instructor.trim()||c.instructor,duration:duration.trim()||c.duration,level:["Beginner","Intermediate","Advanced"].indexOf(level.trim())>=0?level.trim():c.level,overview:desc.trim()||c.desc,desc:desc.trim()||c.desc});
  try{await apiJSON("/courses/"+id,{method:"PUT",body:JSON.stringify(updated)});await refreshAdminData();}catch(e){alert("Unable to update course. Check the Mock API.");}
}
async function deleteCourseApi(id){try{await apiJSON("/courses/"+id,{method:"DELETE"});await refreshAdminData();}catch(e){alert("Unable to delete course. Check the Mock API.");}}

document.addEventListener("DOMContentLoaded",function(){
  var session=requireLogin("admin");if(!session)return;
  refreshAdminData();
  document.querySelectorAll(".add-course-trigger").forEach(function(btn){btn.addEventListener("click",function(e){e.preventDefault();openAddCourseModal();});});
  document.addEventListener("click",function(e){var edit=e.target.closest&&e.target.closest(".edit-course");if(edit){e.preventDefault();editCourse(edit.getAttribute("data-id"));return;}var del=e.target.closest&&e.target.closest(".delete-course");if(del){e.preventDefault();if(confirm("Delete this course?"))deleteCourseApi(del.getAttribute("data-id"));}});
  window.setInterval(refreshAdminData,5000);
});
