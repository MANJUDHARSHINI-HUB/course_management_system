/* =====================================================================
   NAVIGATION.JS
   Central JavaScript navigation bridge used by the React/Vite version.
   It keeps all internal navigation JavaScript-driven while still allowing
   the original legacy scripts to work with React Router.
   ===================================================================== */

function appNavigate(path) {
  try {
    var target = path || "/";
    if (!target.startsWith("/")) {
      target = "/" + target;
    }
    history.pushState({}, "", target);
    window.dispatchEvent(new PopStateEvent("popstate"));
  } catch (err) {
    console.log("Navigation error: " + err);
  }
}


var LEGACY_ROUTE_MAP = {
  "index.html": "/",
  "student-login.html": "/student-login",
  "admin-login.html": "/admin-login",
  "student-register.html": "/student-register",
  "admin-register.html": "/admin-register",
  "student-register-success.html": "/student-register-success",
  "admin-register-success.html": "/admin-register-success",
  "forgot-password.html": "/forgot-password",
  "courses.html": "/courses",
  "student-dashboard.html": "/student-dashboard",
  "admin-dashboard.html": "/admin-dashboard",
  "notifications.html": "/notifications",
  "enroll-placeholder.html": "/enroll-placeholder",
  "about.html": "/about",
  "contact.html": "/contact"
};

function resolveInternalRoute(href) {
  if (!href) return null;
  if (href.indexOf("#") === 0) return null;
  var a = document.createElement("a");
  a.href = href;
  var path = a.pathname.split("/").filter(Boolean).pop() || "index.html";
  var mapped = LEGACY_ROUTE_MAP[path];
  if (mapped) {
    return mapped + (a.search || "");
  }
  if (a.origin === window.location.origin && a.pathname.indexOf("/") === 0) {
    return a.pathname + (a.search || "");
  }
  return null;
}

function setActiveNavLink() {
  try {
    var pathname = window.location.pathname.replace(/\/+/g, "/");
    var currentPage = pathname.split("/").filter(Boolean).pop() || "";
    var links = document.querySelectorAll(".nav-links a, .sidebar nav a");

    for (var i = 0; i < links.length; i++) {
      var linkHref = links[i].getAttribute("href") || "";
      var linkPath = linkHref.split("?")[0].split("#")[0];
      var linkPage = linkPath.split("/").filter(Boolean).pop() || "";
      var isActive = linkPath === pathname ||
        linkPage === currentPage ||
        (pathname === "/" && (linkHref === "/" || linkHref === "index.html"));

      if (isActive) links[i].classList.add("active");
      else links[i].classList.remove("active");
    }
  } catch (err) {
    console.log("Navigation active-link error: " + err);
  }
}

window.appNavigate = appNavigate;

document.addEventListener("DOMContentLoaded", setActiveNavLink);
window.addEventListener("popstate", setActiveNavLink);


document.addEventListener("click", function (event) {
  if (event.defaultPrevented) return;
  var anchor = event.target.closest ? event.target.closest("a") : null;
  if (!anchor) return;
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  if (anchor.target === "_blank") return;
  var route = resolveInternalRoute(anchor.getAttribute("href"));
  if (!route) return;
  event.preventDefault();
  appNavigate(route);
});
