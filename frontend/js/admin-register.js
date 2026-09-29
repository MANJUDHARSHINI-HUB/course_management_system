document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("admin-register-form");
  if (!form) return;
  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    var nameBox=document.getElementById("a-name"), idBox=document.getElementById("a-id"), emailBox=document.getElementById("a-email"), phoneBox=document.getElementById("a-phone"), passBox=document.getElementById("a-pass"), cpassBox=document.getElementById("a-cpass");
    var valid=true;
    function error(box,id,msg){showError(box,id,msg);valid=false;}
    if(isEmpty(nameBox.value))error(nameBox,"a-name-error","Please enter your full name.");else clearError(nameBox,"a-name-error");
    if(isEmpty(idBox.value))error(idBox,"a-id-error","Admin ID is required.");else clearError(idBox,"a-id-error");
    if(isEmpty(emailBox.value))error(emailBox,"a-email-error","Email is required.");else if(!isValidEmail(emailBox.value))error(emailBox,"a-email-error","Please enter a valid email address.");else clearError(emailBox,"a-email-error");
    if(isEmpty(phoneBox.value))error(phoneBox,"a-phone-error","Phone number is required.");else if(!isValidPhone(phoneBox.value))error(phoneBox,"a-phone-error","Enter a valid 10 digit phone number.");else clearError(phoneBox,"a-phone-error");
    if(isEmpty(passBox.value))error(passBox,"a-pass-error","Password is required.");else if(!isValidPassword(passBox.value))error(passBox,"a-pass-error","Password must be at least 6 characters.");else clearError(passBox,"a-pass-error");
    if(isEmpty(cpassBox.value))error(cpassBox,"a-cpass-error","Please confirm your password.");else if(cpassBox.value!==passBox.value)error(cpassBox,"a-cpass-error","Passwords do not match.");else clearError(cpassBox,"a-cpass-error");
    if(!valid)return;
    var msg=document.getElementById("register-msg");
    try{
      var response=await fetch("http://localhost:5000/admins"); if(!response.ok)throw new Error("API unavailable");
      var admins=await response.json(), email=emailBox.value.trim().toLowerCase(), adminId=idBox.value.trim().toLowerCase();
      if(admins.some(function(a){return String(a.email||a.username||"").trim().toLowerCase()===email;})){showError(emailBox,"a-email-error","An account with this email already exists. Please login instead.");return;}
      if(admins.some(function(a){return String(a.adminId||a.id||"").trim().toLowerCase()===adminId;})){showError(idBox,"a-id-error","This Admin ID already exists. Please use a different ID.");return;}
      var newAdmin={name:nameBox.value.trim(),adminId:idBox.value.trim(),id:idBox.value.trim(),username:emailBox.value.trim(),email:emailBox.value.trim(),phone:phoneBox.value.trim(),password:passBox.value,status:"active"};
      var save=await fetch("http://localhost:5000/admins",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(newAdmin)});
      if(!save.ok)throw new Error("Registration failed");
      msg.textContent="Admin account created successfully! Redirecting to login...";msg.style.display="block";
      setTimeout(function(){appNavigate("/admin-login");},700);
    }catch(err){console.error(err);msg.textContent="Unable to save the account. Please make sure the Mock API is running on port 5000.";msg.style.display="block";}
  });
});
