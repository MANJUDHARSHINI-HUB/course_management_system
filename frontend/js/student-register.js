/* =====================================================================
   STUDENT-REGISTER.JS
   Client side validation for the Student Registration form and
   JS based navigation to the success page once the form is valid.
   ===================================================================== */

document.addEventListener("DOMContentLoaded", function () {

  var form = document.getElementById("student-register-form");

  form.addEventListener("submit", function (event) {

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

    // Duplicate username check - the login email is used as the
    // username, so it must not already exist in Local Storage.
    if (isFormValid && findStudentByUsername(emailBox.value) !== null) {
      showError(emailBox, "s-email-error", "An account with this email already exists. Please login instead.");
      isFormValid = false;
    }

    if (isFormValid) {

      // build a JSON object with the entered details
      var newStudent = {
        username: emailBox.value,
        password: passBox.value,
        name: nameBox.value,
        studentId: idBox.value,
        department: deptBox.value,
        email: emailBox.value,
        phone: phoneBox.value
      };

      // JSON.stringify() converts the object to a JSON string
      // (this is how data would normally be sent to a server)
      var studentJSON = JSON.stringify(newStudent);
      console.log("New student registered (JSON string): " + studentJSON);

      // JSON.parse() converts it back to a normal JS object
      var studentObject = JSON.parse(studentJSON);
      console.log("Parsed back to object:", studentObject);

      // save it permanently in Local Storage so it is available
      // the next time this student logs in
      addStudent(studentObject);

      var msgBox = document.getElementById("register-msg");
      msgBox.textContent = "Details look good! Redirecting to the next step...";
      msgBox.style.display = "block";

      // dynamic navigation - move to the next page using JavaScript
      setTimeout(function () {
        window.location.href = "student-register-success.html";
      }, 900);
    }
  });

});
