/* =====================================================================
   ADMIN-REGISTER.JS
   Client side validation for the Admin Registration form and
   JS based navigation to the success page once the form is valid.
   ===================================================================== */

document.addEventListener("DOMContentLoaded", function () {

  var form = document.getElementById("admin-register-form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var nameBox = document.getElementById("a-name");
    var idBox = document.getElementById("a-id");
    var emailBox = document.getElementById("a-email");
    var phoneBox = document.getElementById("a-phone");
    var passBox = document.getElementById("a-pass");
    var cpassBox = document.getElementById("a-cpass");

    var isFormValid = true;

    try {

      if (isEmpty(nameBox.value)) {
        showError(nameBox, "a-name-error", "Please enter your full name.");
        isFormValid = false;
      } else {
        clearError(nameBox, "a-name-error");
      }

      if (isEmpty(idBox.value)) {
        showError(idBox, "a-id-error", "Admin ID is required.");
        isFormValid = false;
      } else {
        clearError(idBox, "a-id-error");
      }

      if (isEmpty(emailBox.value)) {
        showError(emailBox, "a-email-error", "Email is required.");
        isFormValid = false;
      } else if (!isValidEmail(emailBox.value)) {
        showError(emailBox, "a-email-error", "Please enter a valid email address.");
        isFormValid = false;
      } else {
        clearError(emailBox, "a-email-error");
      }

      if (isEmpty(phoneBox.value)) {
        showError(phoneBox, "a-phone-error", "Phone number is required.");
        isFormValid = false;
      } else if (!isValidPhone(phoneBox.value)) {
        showError(phoneBox, "a-phone-error", "Enter a valid 10 digit phone number.");
        isFormValid = false;
      } else {
        clearError(phoneBox, "a-phone-error");
      }

      if (isEmpty(passBox.value)) {
        showError(passBox, "a-pass-error", "Password is required.");
        isFormValid = false;
      } else if (!isValidPassword(passBox.value)) {
        showError(passBox, "a-pass-error", "Password must be at least 6 characters.");
        isFormValid = false;
      } else {
        clearError(passBox, "a-pass-error");
      }

      if (isEmpty(cpassBox.value)) {
        showError(cpassBox, "a-cpass-error", "Please confirm your password.");
        isFormValid = false;
      } else if (cpassBox.value !== passBox.value) {
        showError(cpassBox, "a-cpass-error", "Passwords do not match.");
        isFormValid = false;
      } else {
        clearError(cpassBox, "a-cpass-error");
      }

    } catch (err) {
      console.log("Something went wrong while validating the form: " + err);
      isFormValid = false;
    }

    // Duplicate username check - the login email is used as the
    // username, so it must not already exist in Local Storage.
    if (isFormValid && findAdminByUsername(emailBox.value) !== null) {
      showError(emailBox, "a-email-error", "An account with this email already exists. Please login instead.");
      isFormValid = false;
    }

    if (isFormValid) {

      var newAdmin = {
        username: emailBox.value,
        password: passBox.value,
        name: nameBox.value,
        adminId: idBox.value,
        email: emailBox.value,
        phone: phoneBox.value
      };

      var adminJSON = JSON.stringify(newAdmin);
      console.log("New admin registered (JSON string): " + adminJSON);
      console.log("Parsed back to object:", JSON.parse(adminJSON));

      // save it permanently in Local Storage so it is available
      // the next time this admin logs in
      addAdmin(newAdmin);

      var msgBox = document.getElementById("register-msg");
      msgBox.textContent = "Details look good! Redirecting to the next step...";
      msgBox.style.display = "block";

      setTimeout(function () {
        window.location.href = "admin-register-success.html";
      }, 900);
    }
  });

});
