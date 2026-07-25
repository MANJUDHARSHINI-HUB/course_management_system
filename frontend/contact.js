/* =====================================================================
   CONTACT.JS
   Simple validation for the Contact Us form.
   ===================================================================== */

document.addEventListener("DOMContentLoaded", function () {

  var sendBtn = document.getElementById("contact-send-btn");

  sendBtn.addEventListener("click", function () {

    var nameBox = document.getElementById("c-name");
    var emailBox = document.getElementById("c-email");
    var subjectBox = document.getElementById("c-subject");
    var messageBox = document.getElementById("c-message");

    var isFormValid = true;

    try {
      if (isEmpty(nameBox.value)) {
        showError(nameBox, "c-name-error", "Please enter your name.");
        isFormValid = false;
      } else {
        clearError(nameBox, "c-name-error");
      }

      if (isEmpty(emailBox.value)) {
        showError(emailBox, "c-email-error", "Email is required.");
        isFormValid = false;
      } else if (!isValidEmail(emailBox.value)) {
        showError(emailBox, "c-email-error", "Please enter a valid email address.");
        isFormValid = false;
      } else {
        clearError(emailBox, "c-email-error");
      }

      if (isEmpty(messageBox.value)) {
        showError(messageBox, "c-message-error", "Please write a message.");
        isFormValid = false;
      } else {
        clearError(messageBox, "c-message-error");
      }
    } catch (err) {
      console.log("Contact form validation error: " + err);
      isFormValid = false;
    }

    if (isFormValid) {
      // store the message details as a JSON object, just like the
      // other forms in this project
      var contactMessage = {
        name: nameBox.value,
        email: emailBox.value,
        subject: subjectBox.value,
        message: messageBox.value
      };
      console.log("Contact form submitted (JSON): " + JSON.stringify(contactMessage));

      var msgBox = document.getElementById("contact-msg");
      msgBox.textContent = "Thanks! Your message has been noted. We will get back to you soon.";
      msgBox.style.display = "block";

      // clear the form fields
      nameBox.value = "";
      emailBox.value = "";
      subjectBox.value = "";
      messageBox.value = "";
    }
  });

});
