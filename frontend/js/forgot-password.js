/* =====================================================================
   FORGOT-PASSWORD.JS
   Simple validation for the Forgot Password form.
   ===================================================================== */

document.addEventListener("DOMContentLoaded", function () {

  var resetBtn = document.getElementById("reset-btn");

  resetBtn.addEventListener("click", function () {

    var emailBox = document.getElementById("fp-email");
    var newPassBox = document.getElementById("fp-new");
    var confirmBox = document.getElementById("fp-confirm");

    var isFormValid = true;

    try {
      if (isEmpty(emailBox.value)) {
        showError(emailBox, "fp-email-error", "Email is required.");
        isFormValid = false;
      } else if (!isValidEmail(emailBox.value)) {
        showError(emailBox, "fp-email-error", "Please enter a valid email address.");
        isFormValid = false;
      } else {
        clearError(emailBox, "fp-email-error");
      }

      if (isEmpty(newPassBox.value)) {
        showError(newPassBox, "fp-new-error", "Please enter a new password.");
        isFormValid = false;
      } else if (!isValidPassword(newPassBox.value)) {
        showError(newPassBox, "fp-new-error", "Password must be at least 6 characters.");
        isFormValid = false;
      } else {
        clearError(newPassBox, "fp-new-error");
      }

      if (isEmpty(confirmBox.value)) {
        showError(confirmBox, "fp-confirm-error", "Please confirm the new password.");
        isFormValid = false;
      } else if (confirmBox.value !== newPassBox.value) {
        showError(confirmBox, "fp-confirm-error", "Passwords do not match.");
        isFormValid = false;
      } else {
        clearError(confirmBox, "fp-confirm-error");
      }
    } catch (err) {
      console.log("Forgot password validation error: " + err);
      isFormValid = false;
    }

    if (!isFormValid) {
      return;
    }

    // ----- check the username exists before allowing a reset -----
    var updatedRole = updatePasswordByUsername(emailBox.value, newPassBox.value);

    if (updatedRole === null) {
      showError(emailBox, "fp-email-error", "No account found with this email.");
      return;
    }

    // clear any remembered old password for this username so the
    // login page does not auto-fill the password that no longer works
    forgetLogin(updatedRole);

    var msgBox = document.getElementById("reset-msg");
    msgBox.textContent = "Password reset successful! Redirecting to login...";
    msgBox.style.display = "block";

    setTimeout(function () {
      window.location.href = updatedRole === "admin" ? "admin-login.html" : "student-login.html";
    }, 900);
  });

});
