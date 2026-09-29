/* =====================================================================
   STUDENT-REGISTER.JS
   Client side validation for the Student Registration form and
   JS based navigation to the success page once the form is valid.
   ===================================================================== */

document.addEventListener("DOMContentLoaded", function () {

  var form = document.getElementById("student-register-form");

  form.addEventListener("submit", async function (event) {

    // stop the form from jumping to the next page right away
    // we will navigate using JavaScript after checking everything
    event.preventDefault();

    var nameBox = document.getElementById("s-name");
    var idBox = document.getElementById("s-id");
    var deptBox = document.getElementById("s-dept");
    var emailBox = document.getElementById("s-email");
    var phoneBox = document.getElementById("s-phone");
    var passBox = document.getElementById("s-pass");
    var cpassBox = document.getElementById("s-cpass");

    var isFormValid = true;

    try {

      // Full Name
      if (isEmpty(nameBox.value)) {
        showError(nameBox, "s-name-error", "Please enter your full name.");
        isFormValid = false;
      } else {
        clearError(nameBox, "s-name-error");
      }

      // Student ID
      if (isEmpty(idBox.value)) {
        showError(idBox, "s-id-error", "Student ID is required.");
        isFormValid = false;
      } else {
        clearError(idBox, "s-id-error");
      }

      // Department (select box, should not be blank)
      if (isEmpty(deptBox.value)) {
        showError(deptBox, "s-dept-error", "Please choose a department.");
        isFormValid = false;
      } else {
        clearError(deptBox, "s-dept-error");
      }

      // Email
      if (isEmpty(emailBox.value)) {
        showError(emailBox, "s-email-error", "Email is required.");
        isFormValid = false;
      } else if (!isValidEmail(emailBox.value)) {
        showError(emailBox, "s-email-error", "Please enter a valid email address.");
        isFormValid = false;
      } else {
        clearError(emailBox, "s-email-error");
      }

      // Phone
      if (isEmpty(phoneBox.value)) {
        showError(phoneBox, "s-phone-error", "Phone number is required.");
        isFormValid = false;
      } else if (!isValidPhone(phoneBox.value)) {
        showError(phoneBox, "s-phone-error", "Enter a valid 10 digit phone number.");
        isFormValid = false;
      } else {
        clearError(phoneBox, "s-phone-error");
      }

      // Password
      if (isEmpty(passBox.value)) {
        showError(passBox, "s-pass-error", "Password is required.");
        isFormValid = false;
      } else if (!isValidPassword(passBox.value)) {
        showError(passBox, "s-pass-error", "Password must be at least 6 characters.");
        isFormValid = false;
      } else {
        clearError(passBox, "s-pass-error");
      }

      // Confirm Password
      if (isEmpty(cpassBox.value)) {
        showError(cpassBox, "s-cpass-error", "Please confirm your password.");
        isFormValid = false;
      } else if (cpassBox.value !== passBox.value) {
        showError(cpassBox, "s-cpass-error", "Passwords do not match.");
        isFormValid = false;
      } else {
        clearError(cpassBox, "s-cpass-error");
      }

    } catch (err) {
      // simple error handling like in the faculty notes
      console.log("Something went wrong while validating the form: " + err);
      isFormValid = false;
    }

    if (!isFormValid) return;

    try {
      var existingResponse = await fetch("http://localhost:5000/students");
      if (!existingResponse.ok) throw new Error("API unavailable");
      var existingAccounts = await existingResponse.json();
      var email = emailBox.value.trim().toLowerCase();
      if (existingAccounts.some(function (item) { return String(item.email || item.username || "").trim().toLowerCase() === email; })) {
        showError(emailBox, "s-email-error", "An account with this email already exists. Please login instead.");
        return;
      }
      var newStudent = { id: idBox.value.trim(), studentId: idBox.value.trim(), username: emailBox.value.trim(), password: passBox.value, name: nameBox.value.trim(), department: deptBox.value, dept: deptBox.value, email: emailBox.value.trim(), phone: phoneBox.value.trim(), status: "active" };
      var response = await fetch("http://localhost:5000/students", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newStudent) });
      if (!response.ok) throw new Error("Registration failed");
      addStudent(newStudent);
      var msgBox = document.getElementById("register-msg"); msgBox.textContent = "Details saved successfully! Redirecting to the next step..."; msgBox.style.display = "block";
      setTimeout(function () { appNavigate("/student-register-success"); }, 700);
    } catch (error) {
      console.error(error);
      showError(emailBox, "s-email-error", "Unable to save the account. Please make sure the Mock API is running on port 5000.");
    }

  });

});
