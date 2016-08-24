// html: nav.navbar#navbar>.navbar__header>(a.logo+btn.navbar__toggle>span.navbar__toggle-lines)^+ul.nav>(.nav__item>a.nav__link)*3

function Navbar(options) {
  var element = options.element,
      btn = element.querySelector(".navbar__toggle");

  element.onclick = function(event) {
    if (event.target === btn) toggle();
  };

  function toggle() {
    element.classList.toggle("navbar--drop-nav");
  }
}

var navbar = new Navbar({
  element: document.getElementById("navbar")
});
