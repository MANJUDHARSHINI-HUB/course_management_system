/* React SPA navigation bridge. All portal navigation is driven by JavaScript/React Router. */
(function(){
  window.appNavigate=function(path){
    if(!path) return;
    window.history.pushState({},"",path);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };
  function updateActive(){
    var current=window.location.pathname.replace(/^\//,"") || "index";
    var links=document.querySelectorAll(".nav-links a, .sidebar nav a");
    for(var i=0;i<links.length;i++){var href=links[i].getAttribute("href")||""; var target=href.replace(/^\//,"").replace(/\.html$/i,""); links[i].classList.toggle("active", target===current || (current==="" && target==="index"));}
  }
  window.addEventListener("popstate",updateActive);
  document.addEventListener("DOMContentLoaded",updateActive);
})();
