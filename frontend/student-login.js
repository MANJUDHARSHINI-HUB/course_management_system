/* =====================================================================
   STUDENT-LOGIN.JS
   Simple validation for the Student Login form, then dynamic
   navigation to the student dashboard using JavaScript.
   ===================================================================== */

document.addEventListener("DOMContentLoaded", function () {

  var form = document.getElementById("student-login-form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var emailBox = document.getElementById("sl-email");
    var passBox = document.getElementById("sl-pass");

    var isFormValid = true;

    try {
      if (isEmpty(emailBox.value)) {
        showError(emailBox, "sl-email-error", "Email is required.");
        isFormValid = false;
      } else if (!isValidEmail(emailBox.value)) {
        showError(emailBox, "sl-email-error", "Please enter a valid email address.");
        isFormValid = false;
      } else {
        clearError(emailBox, "sl-email-error");
      }

      if (isEmpty(passBox.value)) {
        showError(passBox, "sl-pass-error", "Password is required.");
        isFormValid = false;
      } else {
        clearError(passBox, "sl-pass-error");
      }
    } catch (err) {
      console.log("Login validation error: " + err);
      isFormValid = false;
    }

    if (isFormValid) {
      var loginMsg = document.getElementById("login-msg");
      loginMsg.textContent = "Login successful! Taking you to your dashboard...";
      loginMsg.style.display = "block";

      // dynamic navigation using JavaScript
      setTimeout(function () {
        window.location.href = "student-dashboard.html";
      }, 800);
    }
  });

});
