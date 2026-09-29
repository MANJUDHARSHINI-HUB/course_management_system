document.addEventListener("DOMContentLoaded", function () {
  var form=document.getElementById("admin-login-form");if(!form)return;
  var emailBox=document.getElementById("al-email"),passBox=document.getElementById("al-pass"),rememberBox=form.querySelector('input[type="checkbox"]');
  form.addEventListener("submit",async function(event){event.preventDefault();var valid=true;
    if(isEmpty(emailBox.value)){showError(emailBox,"al-email-error","Email is required.");valid=false;}else if(!isValidEmail(emailBox.value)){showError(emailBox,"al-email-error","Please enter a valid email address.");valid=false;}else clearError(emailBox,"al-email-error");
    if(isEmpty(passBox.value)){showError(passBox,"al-pass-error","Password is required.");valid=false;}else clearError(passBox,"al-pass-error");if(!valid)return;
    var msg=document.getElementById("login-msg");
    try{var r=await fetch("http://localhost:5000/admins");if(!r.ok)throw new Error();var list=await r.json(),account=list.find(function(a){return String(a.email||a.username||"").trim().toLowerCase()===emailBox.value.trim().toLowerCase();});
      if(!account){showError(emailBox,"al-email-error","No admin account found with this email. Please register first.");return;}if(account.password!==passBox.value){showError(passBox,"al-pass-error","Incorrect password. Please try again.");return;}
      setSession("admin",account.username||account.email);if(rememberBox&&rememberBox.checked)rememberLogin("admin",emailBox.value,passBox.value);else forgetLogin("admin");msg.textContent="Login successful! Taking you to the console...";msg.style.display="block";setTimeout(function(){appNavigate("/admin-dashboard");},500);
    }catch(err){msg.textContent="Unable to connect to the Mock API. Start it on port 5000 and try again.";msg.style.display="block";}
  });
});
