/* =====================================================================
   DASHBOARD.JS
   Prints the logged in student's profile details on the dashboard
   using the studentProfile JSON object from data.js.
   ===================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  try {

    // JSON.stringify() then JSON.parse() - just like a value that was
    // saved and then read back, as shown in the faculty notes
    var profileJSON = JSON.stringify(studentProfile);
    var profile = JSON.parse(profileJSON);

    // fill the profile card
    document.getElementById("profile-name-value").textContent = profile.name;
    document.getElementById("profile-id-value").textContent = profile.studentId;
    document.getElementById("profile-email-value").textContent = profile.email;
    document.getElementById("profile-dept-value").textContent = profile.department;

    // update the welcome banner and topbar with the student's name
    document.getElementById("welcome-name").textContent = profile.name + ".";
    document.getElementById("topbar-student-name").textContent = profile.name;

  } catch (err) {
    console.log("Error while loading student profile: " + err);
  }
});
