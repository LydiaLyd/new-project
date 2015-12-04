(function() {
  if (document.querySelector(".navbar")) {
    var navbar = document.querySelector(".navbar"),
        navbarHeader = navbar.querySelector(".navbar__header"),
        navbarNav = navbar.querySelector(".navbar__nav"),
        navToggle = navbar.querySelector(".navbar__toggle"),
        navToggleLines = navbar.querySelector(".navbar__lines"),
        navToggleCounter = 1;

    navToggle.addEventListener("click", function() {
      event.preventDefault();

      navToggleCounter++;

      if (!(navToggleCounter % 2)) {
        navbarHeader.classList.add("navbar__header--active");
        navToggleLines.classList.add("navbar__lines--cross");
        navbarNav.classList.add("navbar__nav--drop-down");
      } else if (navToggleCounter % 2) {
        navbarHeader.classList.remove("navbar__header--active");
        navToggleLines.classList.remove("navbar__lines--cross");
        navbarNav.classList.remove("navbar__nav--drop-down");
      }
    });
  }
})();
