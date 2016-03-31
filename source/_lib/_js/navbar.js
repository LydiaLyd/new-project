///////////////////////////////////////////////////////////////////////////////
// N A V I G A T I O N
///////////////////////////////////////////////////////////////////////////////

(function() {

  //////////////////////////////////////////////////
  // То, что делает навигацию "плавающей".
  //////////////////////////////////////////////////

  var navbar = document.querySelector(".navbar"),
      lastScroll = 0,
      currentScroll;

  window.addEventListener("scroll", function() {
    currentScroll = window.pageYOffset;
    if (currentScroll > lastScroll) {
      navbar.classList.add("navbar--hide");
    } else {
      navbar.classList.remove("navbar--hide");
    }
    lastScroll = currentScroll;
  });

  //////////////////////////////////////////////////
  // Переключатель навигации
  //////////////////////////////////////////////////

  var nav = navbar.querySelector(".navbar__nav"),
      toggle = navbar.querySelector(".btn--nav-toggle"),
      toggleCounter = 1;

  toggle.addEventListener("click", function() {
    toggle.classList.toggle("btn--pressed");
    nav.classList.toggle("navbar__nav--show");
  });

  window.addEventListener("scroll", function() {
    toggle.classList.remove("btn--pressed");
    nav.classList.remove("navbar__nav--show");
  });

  //////////////////////////////////////////////////
  // Добавление ссылкам класс --current.
  //////////////////////////////////////////////////

  var links = navbar.querySelectorAll(".navbar__link"),
      intro = document.querySelector(".intro"),
      skills = document.querySelector(".skills"),
      // Определяем верхнюю и нижнюю координаты секии Skills
      skillsTop = intro.offsetHeight,
      skillsBottom = intro.offsetHeight + skills.offsetHeight,
      portfolio = document.querySelector(".portfolio"),
      // Определяем верхнюю и нижнюю координаты секии Portfolio
      portfolioTop = intro.offsetHeight + skills.offsetHeight,
      portfolioBottom = intro.offsetHeight + skills.offsetHeight + portfolio.offsetHeight,
      about = document.querySelector(".about"),
      // Определяем верхнюю и нижнюю координаты секии About
      aboutTop = intro.offsetHeight + skills.offsetHeight + portfolio.offsetHeight,
      aboutBottom = intro.offsetHeight + skills.offsetHeight + portfolio.offsetHeight + about.offsetHeight,
      windowHeight = window.innerHeight;

  window.addEventListener("scroll", function() {
    /**
     * windowHeight/2 вычитается, чтобы при прокрутке вверх
     * предыдущая ссылка не сразу становилась текущей.
     */
    if (currentScroll < (skillsTop - windowHeight/2)) {
      resetLinks();
    } else if (currentScroll >= skillsTop && currentScroll < (skillsBottom - windowHeight/2)) {
      resetLinks();
      links[0].classList.add("navbar__link--current");
    } else if (currentScroll >= portfolioTop && currentScroll < (portfolioBottom - windowHeight/2)) {
      resetLinks();
      links[1].classList.add("navbar__link--current");
    } else if (currentScroll >= aboutTop) {
      resetLinks();
      links[2].classList.add("navbar__link--current");
    }
  });

  //////////////////////////////////////////////////
  // Functions
  //////////////////////////////////////////////////

  // Перебирает ссылки и удаляет класс выделения.
  function resetLinks() {
    for (var i = 0; i < links.length; i++) {
      var link = links[i];
      link.classList.remove("navbar__link--current");
    }
  }
})();
