/* =====================================================================
   SESSION.JS
   Shared behaviour for pages behind login (Student Dashboard, Admin
   Dashboard, Notifications). Makes every ".logout" link end the
   session using JavaScript before navigating back to the homepage.
   Logout never deletes saved accounts, courses or enrollments - it
   only clears the current session in Local Storage.
   ===================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  try {
    var logoutLinks = document.querySelectorAll(".logout");

    for (var i = 0; i < logoutLinks.length; i++) {
      logoutLinks[i].addEventListener("click", function (event) {
        event.preventDefault();
        clearSession();
        window.location.href = "index.html";
      });
    }
  } catch (err) {
    console.log("Error wiring up logout: " + err);
  }
});
