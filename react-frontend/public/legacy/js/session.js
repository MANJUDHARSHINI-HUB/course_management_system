/* =====================================================================
   SESSION.JS
   Shared session/logout behaviour plus a lightweight student force-logout
   guard used by the Admin Dashboard.
   ===================================================================== */

function checkForcedStudentLogout() {
  try {
    var session = getSession();
    if (session && session.role === "student" && isStudentForceLoggedOut(session.username)) {
      clearSession();
      appNavigate("/student-login");
      return true;
    }
  } catch (err) {
    console.log("Session guard error: " + err);
  }
  return false;
}

document.addEventListener("DOMContentLoaded", function () {
  try {
    var logoutLinks = document.querySelectorAll(".logout");
    for (var i = 0; i < logoutLinks.length; i++) {
      logoutLinks[i].addEventListener("click", function (event) {
        event.preventDefault();
        clearSession();
        appNavigate("/");
      });
    }

    checkForcedStudentLogout();
    window.addEventListener("storage", checkForcedStudentLogout);
    window.setInterval(function () {
      var session = getSession();
      if (session && session.role === "student") touchActiveStudent(session.username);
      if (session && session.role === "admin") touchActiveAdmin(session.username);
      checkForcedStudentLogout();
    }, 1500);
  } catch (err) {
    console.log("Error wiring up logout: " + err);
  }
});
