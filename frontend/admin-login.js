/* =====================================================================
   ADMIN-LOGIN.JS
   Simple validation for the Admin Login form, then dynamic
   navigation to the admin dashboard using JavaScript.
   ===================================================================== */

document.addEventListener("DOMContentLoaded", function () {

  var form = document.getElementById("admin-login-form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var emailBox = document.getElementById("al-email");
    var passBox = document.getElementById("al-pass");

    var isFormValid = true;

    try {
      if (isEmpty(emailBox.value)) {
        showError(emailBox, "al-email-error", "Email is required.");
        isFormValid = false;
      } else if (!isValidEmail(emailBox.value)) {
        showError(emailBox, "al-email-error", "Please enter a valid email address.");
        isFormValid = false;
      } else {
        clearError(emailBox, "al-email-error");
      }

      if (isEmpty(passBox.value)) {
        showError(passBox, "al-pass-error", "Password is required.");
        isFormValid = false;
      } else {
        clearError(passBox, "al-pass-error");
      }
    } catch (err) {
      console.log("Login validation error: " + err);
      isFormValid = false;
    }

    if (isFormValid) {
      var loginMsg = document.getElementById("login-msg");
      loginMsg.textContent = "Login successful! Taking you to the console...";
      loginMsg.style.display = "block";

      setTimeout(function () {
        window.location.href = "admin-dashboard.html";
      }, 800);
    }
  });

});
