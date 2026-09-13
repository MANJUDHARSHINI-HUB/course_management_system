/* =====================================================================
   ADMIN-LOGIN.JS
   Validates the Admin Login form, checks the entered details against
   the admin accounts saved in Local Storage, remembers the login (if
   requested) and then navigates to the admin dashboard using
   JavaScript.
   ===================================================================== */

document.addEventListener("DOMContentLoaded", function () {

  var form = document.getElementById("admin-login-form");
  var emailBox = document.getElementById("al-email");
  var passBox = document.getElementById("al-pass");
  var rememberBox = document.querySelector('#admin-login-form .checkbox-row input[type="checkbox"]');

  // ----- Remember Login Information -----
  try {
    var remembered = getRememberedLogin("admin");
    if (remembered !== null) {
      emailBox.value = remembered.username;
      passBox.value = remembered.password;
      if (rememberBox !== null) {
        rememberBox.checked = true;
      }
    }
  } catch (err) {
    console.log("Error loading remembered admin login: " + err);
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

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

    if (!isFormValid) {
      return;
    }

    // ----- check the entered details against Local Storage -----
    var loginMsg = document.getElementById("login-msg");
    var account = findAdminByUsername(emailBox.value);

    if (account === null) {
      showError(emailBox, "al-email-error", "No admin account found with this email. Please register first.");
      return;
    }

    if (account.password !== passBox.value) {
      showError(passBox, "al-pass-error", "Incorrect password. Please try again.");
      return;
    }

    setSession("admin", account.username);

    if (rememberBox !== null && rememberBox.checked) {
      rememberLogin("admin", emailBox.value, passBox.value);
    } else {
      forgetLogin("admin");
    }

    loginMsg.textContent = "Login successful! Taking you to the console...";
    loginMsg.style.display = "block";

    setTimeout(function () {
      window.location.href = "admin-dashboard.html";
    }, 800);
  });

});
