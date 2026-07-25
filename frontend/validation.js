/* =====================================================================
   VALIDATION.JS
   Simple, beginner style helper functions used for client-side form
   validation on every form page of the project.
   ===================================================================== */

// checks if a text field is empty (after removing extra spaces)
function isEmpty(value) {
  return value.trim() === "";
}

// checks if the email typed by the user looks like a real email
function isValidEmail(email) {
  var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

// checks if the phone number has 10 digits (simple Indian mobile check)
function isValidPhone(phone) {
  var pattern = /^[6-9][0-9]{9}$/;
  var cleaned = phone.replace(/[\s-]/g, "");   // remove spaces and dashes
  cleaned = cleaned.replace("+91", "");
  return pattern.test(cleaned);
}

// checks if the password has at least 6 characters
function isValidPassword(password) {
  return password.length >= 6;
}

// shows an error message under a field and marks it in red
function showError(inputBox, errorBoxId, message) {
  var errorBox = document.getElementById(errorBoxId);
  if (errorBox !== null) {
    errorBox.textContent = message;
  }
  if (inputBox !== null) {
    inputBox.parentElement.classList.add("has-error");
  }
}

// clears an error message from a field
function clearError(inputBox, errorBoxId) {
  var errorBox = document.getElementById(errorBoxId);
  if (errorBox !== null) {
    errorBox.textContent = "";
  }
  if (inputBox !== null) {
    inputBox.parentElement.classList.remove("has-error");
  }
}
