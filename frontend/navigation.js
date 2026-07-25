/* =====================================================================
   NAVIGATION.JS
   Makes the navigation menu dynamic. Instead of writing class="active"
   by hand on every page, this script looks at the current page URL
   and highlights the matching link automatically.
   ===================================================================== */

function setActiveNavLink() {
  try {
    // get just the file name from the full URL, e.g. "courses.html"
    var pathParts = window.location.pathname.split("/");
    var currentPage = pathParts[pathParts.length - 1];

    if (currentPage === "") {
      currentPage = "index.html";
    }

    // collect links from the top navbar and the dashboard sidebar
    var links = document.querySelectorAll(".nav-links a, .sidebar nav a");

    for (var i = 0; i < links.length; i++) {
      var linkHref = links[i].getAttribute("href");

      if (linkHref === currentPage) {
        links[i].classList.add("active");
      } else {
        links[i].classList.remove("active");
      }
    }
  } catch (err) {
    // basic error handling, just log it so the page does not break
    console.log("Navigation error: " + err);
  }
}

// run as soon as the page HTML is ready
document.addEventListener("DOMContentLoaded", setActiveNavLink);
