document.addEventListener("DOMContentLoaded", function () {
  var form=document.getElementById("student-login-form"); if(!form)return;
  var emailBox=document.getElementById("sl-email"), passBox=document.getElementById("sl-pass"), rememberBox=form.querySelector('input[type="checkbox"]');
  form.addEventListener("submit",async function(event){
    event.preventDefault(); var valid=true;
    if(isEmpty(emailBox.value)){showError(emailBox,"sl-email-error","Email is required.");valid=false;}else if(!isValidEmail(emailBox.value)){showError(emailBox,"sl-email-error","Please enter a valid email address.");valid=false;}else clearError(emailBox,"sl-email-error");
    if(isEmpty(passBox.value)){showError(passBox,"sl-pass-error","Password is required.");valid=false;}else clearError(passBox,"sl-pass-error"); if(!valid)return;
    var msg=document.getElementById("login-msg");
    try{var r=await fetch("http://localhost:5000/students");if(!r.ok)throw new Error();var list=await r.json(),account=list.find(function(s){return String(s.email||s.username||"").trim().toLowerCase()===emailBox.value.trim().toLowerCase();});
      if(!account){showError(emailBox,"sl-email-error","No student account found with this email. Please register first.");return;}
      if(account.password!==passBox.value){showError(passBox,"sl-pass-error","Incorrect password. Please try again.");return;}
      setSession("student",account.username||account.email); if(rememberBox&&rememberBox.checked)rememberLogin("student",emailBox.value,passBox.value);else forgetLogin("student");
      msg.textContent="Login successful! Taking you to your dashboard...";msg.style.display="block";setTimeout(function(){appNavigate("/student-dashboard");},500);
    }catch(err){msg.textContent="Unable to connect to the Mock API. Start it on port 5000 and try again.";msg.style.display="block";}
  });
});
