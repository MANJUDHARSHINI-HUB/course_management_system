/* =====================================================================
   ADMIN-REGISTER.JS
   Client side validation for the Admin Registration form and
   JS based navigation to the success page once the form is valid.
   ===================================================================== */

document.addEventListener("DOMContentLoaded", function () {

  var form = document.getElementById("admin-register-form");

  form.addEventListener("submit", async function (event) {
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

    if (!isFormValid) return;

    try {
      var existingResponse = await fetch("http://localhost:5000/admins");
      if (!existingResponse.ok) throw new Error("API unavailable");
      var existingAccounts = await existingResponse.json();
      var email = emailBox.value.trim().toLowerCase();
      if (existingAccounts.some(function (item) { return String(item.email || item.username || "").trim().toLowerCase() === email; })) {
        showError(emailBox, "a-email-error", "An account with this email already exists. Please login instead.");
        return;
      }
      var newAdmin = { id: idBox.value.trim(), adminId: idBox.value.trim(), username: emailBox.value.trim(), password: passBox.value, name: nameBox.value.trim(), email: emailBox.value.trim(), phone: phoneBox.value.trim(), status: "active" };
      var response = await fetch("http://localhost:5000/admins", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newAdmin) });
      if (!response.ok) throw new Error("Registration failed");
      addAdmin(newAdmin);
      var msgBox = document.getElementById("register-msg"); msgBox.textContent = "Details saved successfully! Redirecting to the next step..."; msgBox.style.display = "block";
      setTimeout(function () { appNavigate("/admin-register-success"); }, 700);
    } catch (error) {
      console.error(error);
      showError(emailBox, "a-email-error", "Unable to save the account. Please make sure the Mock API is running on port 5000.");
    }

  });

});
