/* =====================================================================
   NOTIFICATIONS.JS
   Prints the notification cards on notifications.html using the
   notificationsData JSON array from data.js.
   ===================================================================== */

function buildNotificationCard(note) {
  var card = '<div class="notif-card type-' + note.type + '">';
  card += '  <div class="icon"><i class="' + note.icon + '"></i></div>';
  card += '  <div><h4>' + note.title + '</h4><p>' + note.message + '</p><time>' + note.time + '</time></div>';
  if (note.unread) {
    card += '  <span class="unread-dot"></span>';
  }
  card += '</div>';
  return card;
}

document.addEventListener("DOMContentLoaded", function () {
  try {
    var container = document.getElementById("notifications-container");

    if (container !== null) {
      var allNotifsHTML = "";
      for (var i = 0; i < notificationsData.length; i++) {
        allNotifsHTML += buildNotificationCard(notificationsData[i]);
      }
      container.innerHTML = allNotifsHTML;
    }
  } catch (err) {
    console.log("Error while loading notifications: " + err);
  }
});
