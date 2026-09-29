document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("student-register-form");
  if (!form) return;

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    var nameBox = document.getElementById("s-name");
    var idBox = document.getElementById("s-id");
    var deptBox = document.getElementById("s-dept");
    var emailBox = document.getElementById("s-email");
    var phoneBox = document.getElementById("s-phone");
    var passBox = document.getElementById("s-pass");
    var cpassBox = document.getElementById("s-cpass");
    var isValid = true;

    function error(box, id, message) { showError(box, id, message); isValid = false; }
    if (isEmpty(nameBox.value)) error(nameBox, "s-name-error", "Please enter your full name."); else clearError(nameBox, "s-name-error");
    if (isEmpty(idBox.value)) error(idBox, "s-id-error", "Student ID is required."); else clearError(idBox, "s-id-error");
    if (isEmpty(deptBox.value)) error(deptBox, "s-dept-error", "Please choose a department."); else clearError(deptBox, "s-dept-error");
    if (isEmpty(emailBox.value)) error(emailBox, "s-email-error", "Email is required.");
    else if (!isValidEmail(emailBox.value)) error(emailBox, "s-email-error", "Please enter a valid email address.");
    else clearError(emailBox, "s-email-error");
    if (isEmpty(phoneBox.value)) error(phoneBox, "s-phone-error", "Phone number is required.");
    else if (!isValidPhone(phoneBox.value)) error(phoneBox, "s-phone-error", "Enter a valid 10 digit phone number.");
    else clearError(phoneBox, "s-phone-error");
    if (isEmpty(passBox.value)) error(passBox, "s-pass-error", "Password is required.");
    else if (!isValidPassword(passBox.value)) error(passBox, "s-pass-error", "Password must be at least 6 characters.");
    else clearError(passBox, "s-pass-error");
    if (isEmpty(cpassBox.value)) error(cpassBox, "s-cpass-error", "Please confirm your password.");
    else if (cpassBox.value !== passBox.value) error(cpassBox, "s-cpass-error", "Passwords do not match.");
    else clearError(cpassBox, "s-cpass-error");
    if (!isValid) return;

    var msg = document.getElementById("register-msg");
    try {
      var response = await fetch("http://localhost:5000/students");
      if (!response.ok) throw new Error("API unavailable");
      var students = await response.json();
      var email = emailBox.value.trim().toLowerCase();
      var studentId = idBox.value.trim().toLowerCase();
      if (students.some(function (s) { return String(s.email || s.username || "").trim().toLowerCase() === email; })) {
        showError(emailBox, "s-email-error", "An account with this email already exists. Please login instead.");
        return;
      }
      if (students.some(function (s) { return String(s.studentId || s.id || "").trim().toLowerCase() === studentId; })) {
        showError(idBox, "s-id-error", "This Student ID already exists. Please use a different ID.");
        return;
      }
      var newStudent = {
        name: nameBox.value.trim(), studentId: idBox.value.trim(), id: idBox.value.trim(),
        username: emailBox.value.trim(), email: emailBox.value.trim(), department: deptBox.value,
        dept: deptBox.value, phone: phoneBox.value.trim(), password: passBox.value, status: "active"
      };
      var save = await fetch("http://localhost:5000/students", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newStudent)
      });
      if (!save.ok) throw new Error("Registration failed");
      msg.textContent = "Student account created successfully! Redirecting to login...";
      msg.style.display = "block";
      setTimeout(function () { appNavigate("/student-login"); }, 700);
    } catch (err) {
      console.error(err);
      msg.textContent = "Unable to save the account. Please make sure the Mock API is running on port 5000.";
      msg.style.display = "block";
    }
  });
});
