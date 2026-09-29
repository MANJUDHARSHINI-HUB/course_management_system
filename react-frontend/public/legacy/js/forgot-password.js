document.addEventListener("DOMContentLoaded", function () {
  var resetBtn = document.getElementById("reset-btn");
  if (!resetBtn) return;
  resetBtn.addEventListener("click", async function () {
    var emailBox=document.getElementById("fp-email"), newPassBox=document.getElementById("fp-new"), confirmBox=document.getElementById("fp-confirm"), valid=true;
    if(isEmpty(emailBox.value)){showError(emailBox,"fp-email-error","Email is required.");valid=false;}else if(!isValidEmail(emailBox.value)){showError(emailBox,"fp-email-error","Please enter a valid email address.");valid=false;}else clearError(emailBox,"fp-email-error");
    if(isEmpty(newPassBox.value)){showError(newPassBox,"fp-new-error","Please enter a new password.");valid=false;}else if(!isValidPassword(newPassBox.value)){showError(newPassBox,"fp-new-error","Password must be at least 6 characters.");valid=false;}else clearError(newPassBox,"fp-new-error");
    if(isEmpty(confirmBox.value)){showError(confirmBox,"fp-confirm-error","Please confirm the new password.");valid=false;}else if(confirmBox.value!==newPassBox.value){showError(confirmBox,"fp-confirm-error","Passwords do not match.");valid=false;}else clearError(confirmBox,"fp-confirm-error");
    if(!valid)return;
    try{
      var email=emailBox.value.trim().toLowerCase();
      var foundRole=null, foundId=null;
      for(var role of ["students","admins"]){
        var r=await fetch("http://localhost:5000/"+role); if(!r.ok)throw new Error("API unavailable"); var list=await r.json();
        var item=list.find(function(x){return String(x.email||x.username||"").toLowerCase()===email;});
        if(item){foundRole=role;foundId=item.id;break;}
      }
      if(!foundRole){showError(emailBox,"fp-email-error","No account found with this email.");return;}
      var update=await fetch("http://localhost:5000/"+foundRole+"/"+foundId,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:newPassBox.value})});
      if(!update.ok)throw new Error("Update failed");
      updatePasswordByUsername(email,newPassBox.value); forgetLogin(foundRole==="admins"?"admin":"student");
      var msg=document.getElementById("reset-msg");msg.textContent="Password reset successful! Redirecting to login...";msg.style.display="block";
      setTimeout(function(){appNavigate(foundRole==="admins"?"/admin-login":"/student-login");},700);
    }catch(e){console.error(e);showError(emailBox,"fp-email-error","Unable to update the password. Please make sure the Mock API is running on port 5000.");}
  });
});
