document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("student-login-form");
  if (!form) return;
  var emailBox = document.getElementById("sl-email");
  var passBox = document.getElementById("sl-pass");
  var rememberBox = document.querySelector('#student-login-form .checkbox-row input[type="checkbox"]');
  try {
    var remembered = getRememberedLogin("student");
    if (remembered) { emailBox.value = remembered.username; passBox.value = remembered.password; if (rememberBox) rememberBox.checked = true; }
  } catch (e) {}

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    var valid = true;
    if (isEmpty(emailBox.value)) { showError(emailBox, "sl-email-error", "Email is required."); valid = false; }
    else if (!isValidEmail(emailBox.value)) { showError(emailBox, "sl-email-error", "Please enter a valid email address."); valid = false; }
    else clearError(emailBox, "sl-email-error");
    if (isEmpty(passBox.value)) { showError(passBox, "sl-pass-error", "Password is required."); valid = false; }
    else clearError(passBox, "sl-pass-error");
    if (!valid) return;

    try {
      var response = await fetch("http://localhost:5000/students");
      if (!response.ok) throw new Error("API unavailable");
      var students = await response.json();
      var email = emailBox.value.trim().toLowerCase();
      var account = students.find(function (student) {
        return String(student.username || student.email || "").trim().toLowerCase() === email || String(student.email || "").trim().toLowerCase() === email;
      });
      if (!account) { showError(emailBox, "sl-email-error", "No student account found with this email. Please register first."); return; }
      if (String(account.password) !== passBox.value) { showError(passBox, "sl-pass-error", "Incorrect password. Please try again."); return; }

      var normalized = { username: account.username || account.email, password: account.password, name: account.name, studentId: account.studentId || account.id, department: account.department || account.dept, email: account.email, phone: account.phone || "" };
      var current = getStudents();
      var existing = current.filter(function (s) { return String(s.username).toLowerCase() !== String(normalized.username).toLowerCase(); });
      existing.push(normalized); saveStudents(existing);
      setSession("student", normalized.username);
      if (rememberBox && rememberBox.checked) rememberLogin("student", normalized.username, normalized.password); else forgetLogin("student");
      var loginMsg = document.getElementById("login-msg"); if (loginMsg) { loginMsg.textContent = "Login successful! Taking you to your dashboard..."; loginMsg.style.display = "block"; }
      setTimeout(function () { appNavigate("/student-dashboard"); }, 500);
    } catch (error) {
      console.error(error);
      showError(emailBox, "sl-email-error", "Unable to connect to the Mock API. Please start json-server on port 5000.");
    }
  });
});
