document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("admin-login-form");
  if (!form) return;
  var emailBox = document.getElementById("al-email");
  var passBox = document.getElementById("al-pass");
  var rememberBox = document.querySelector('#admin-login-form .checkbox-row input[type="checkbox"]');
  try { var remembered = getRememberedLogin("admin"); if (remembered) { emailBox.value = remembered.username; passBox.value = remembered.password; if (rememberBox) rememberBox.checked = true; } } catch (e) {}

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    var valid = true;
    if (isEmpty(emailBox.value)) { showError(emailBox, "al-email-error", "Email is required."); valid = false; }
    else if (!isValidEmail(emailBox.value)) { showError(emailBox, "al-email-error", "Please enter a valid email address."); valid = false; }
    else clearError(emailBox, "al-email-error");
    if (isEmpty(passBox.value)) { showError(passBox, "al-pass-error", "Password is required."); valid = false; } else clearError(passBox, "al-pass-error");
    if (!valid) return;

    try {
      var response = await fetch("http://localhost:5000/admins");
      if (!response.ok) throw new Error("API unavailable");
      var admins = await response.json();
      var email = emailBox.value.trim().toLowerCase();
      var account = admins.find(function (admin) { return String(admin.username || admin.email || "").trim().toLowerCase() === email || String(admin.email || "").trim().toLowerCase() === email; });
      if (!account) { showError(emailBox, "al-email-error", "No admin account found with this email. Please register first."); return; }
      if (String(account.password) !== passBox.value) { showError(passBox, "al-pass-error", "Incorrect password. Please try again."); return; }
      var normalized = { username: account.username || account.email, password: account.password, name: account.name, adminId: account.adminId || account.id, email: account.email, phone: account.phone || "" };
      var current = getAdmins(); var existing = current.filter(function (a) { return String(a.username).toLowerCase() !== String(normalized.username).toLowerCase(); }); existing.push(normalized); saveAdmins(existing);
      setSession("admin", normalized.username);
      if (rememberBox && rememberBox.checked) rememberLogin("admin", normalized.username, normalized.password); else forgetLogin("admin");
      var loginMsg = document.getElementById("login-msg"); if (loginMsg) { loginMsg.textContent = "Login successful! Taking you to the console..."; loginMsg.style.display = "block"; }
      setTimeout(function () { appNavigate("/admin-dashboard"); }, 500);
    } catch (error) {
      console.error(error);
      showError(emailBox, "al-email-error", "Unable to connect to the Mock API. Please start json-server on port 5000.");
    }
  });
});
