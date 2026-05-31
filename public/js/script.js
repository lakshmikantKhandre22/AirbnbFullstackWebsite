(function () {
  "use strict";

  // Bootstrap form validation
  document.querySelectorAll(".needs-validation").forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      },
      false
    );
  });

  // Highlight active nav link
  var path = window.location.pathname;
  document.querySelectorAll("[data-nav]").forEach(function (link) {
    var nav = link.getAttribute("data-nav");
    if (nav === "explore" && (path === "/" || path === "/listings" || path.startsWith("/listings/filter") || path.startsWith("/listings/search"))) {
      link.classList.add("active");
    }
    if (nav === "host" && path === "/listings/new") {
      link.classList.add("active");
    }
  });

  // Auto-dismiss flash alerts after 5s
  document.querySelectorAll(".flash-alert").forEach(function (alert) {
    setTimeout(function () {
      var closeBtn = alert.querySelector(".btn-close");
      if (closeBtn) closeBtn.click();
    }, 5000);
  });

  // Smooth scroll for hero CTA
  document.querySelectorAll('a[href="#listings"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var target = document.getElementById("listings");
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
})();
