/* =====================================================================
   STUDENT-LOGIN.JS
   Validates the Student Login form, checks the entered details
   against the accounts saved in Local Storage, remembers the login
   (if requested) and then navigates to the student dashboard using
   JavaScript.
   ===================================================================== */

document.addEventListener("DOMContentLoaded", function () {

  var form = document.getElementById("student-login-form");
  var emailBox = document.getElementById("sl-email");
  var passBox = document.getElementById("sl-pass");
  var rememberBox = document.querySelector('#student-login-form .checkbox-row input[type="checkbox"]');

  // ----- Remember Login Information -----
  // if this browser has a remembered student login, fill it back in
  try {
    var remembered = getRememberedLogin("student");
    if (remembered !== null) {
      emailBox.value = remembered.username;
      passBox.value = remembered.password;
      if (rememberBox !== null) {
        rememberBox.checked = true;
      }
    }
  } catch (err) {
    console.log("Error loading remembered student login: " + err);
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

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

    if (!isFormValid) {
      return;
    }

    // ----- check the entered details against Local Storage -----
    var loginMsg = document.getElementById("login-msg");
    var account = findStudentByUsername(emailBox.value);

    if (account === null) {
      showError(emailBox, "sl-email-error", "No student account found with this email. Please register first.");
      return;
    }

    if (account.password !== passBox.value) {
      showError(passBox, "sl-pass-error", "Incorrect password. Please try again.");
      return;
    }

    // login is valid - start the session
    setSession("student", account.username);

    // Remember Login Information - only if the checkbox is ticked
    if (rememberBox !== null && rememberBox.checked) {
      rememberLogin("student", emailBox.value, passBox.value);
    } else {
      forgetLogin("student");
    }

    loginMsg.textContent = "Login successful! Taking you to your dashboard...";
    loginMsg.style.display = "block";

    // dynamic navigation using JavaScript
    setTimeout(function () {
      window.location.href = "student-dashboard.html";
    }, 800);
  });

});
