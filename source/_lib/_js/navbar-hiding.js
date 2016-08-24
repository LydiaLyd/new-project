// html: nav.navbar#navbar>(.navbar__header>a.logo+btn.navbar__toggle>span.navbar__toggle-lines)+(ul.nav>(.nav__item>a.nav__link[href="#section-$"])*3)^+sect#section-$*3
// http://codepen.io/LydiaLyd/full/RRmbJb/

(function() {
  // конструктор для navbar'а
  function Navbar(options) {
    var element = this.element = options.element,
        btn = element.querySelector(".navbar__toggle");

    this.links = element.getElementsByClassName("nav__link");

    element.onclick = function(event) {
      if (event.target === btn) toggle();
    };

    function toggle() {
      element.classList.toggle("navbar--drop-nav");
    }
  }

  // создаем navbar
  var navbar = new Navbar({
    element: document.getElementById("navbar")
  });





  // на сколько прокрутили в прошлый раз
  var lastScroll = 0;
  // текущая прокрутка
  var currentScroll;

  // создаем список из секции, к которым ведут ссылки
  var sections = [];
  Array.prototype.forEach.call(navbar.links, function(link) {
    // определяем id
    var id = link.getAttribute("href").slice(1);
    // вносим в список
    sections.push(document.getElementById(id));
  });

  // просматриваемая секция
  var currentSection = sections[0];

  // когда прокручивается страница
  window.addEventListener("scroll", function() {
    // определяем на сколько прокрутили
    currentScroll = window.pageYOffset;

    // прячем или показываем navbar
    pushNavbar(lastScroll, currentScroll);

    // определяем, какая секция сейчас просматривается
    defineSection(sections);
    // подсвечиваем ссылку
    highlightLink(currentSection);

    // запоминаем на сколько прокрутили страницу
    lastScroll = currentScroll;
  });

  // прячет или показывает navbar, когда прокручивают страницу
  function pushNavbar(lastScroll, currentScroll) {
    // если прокрутили вниз - прячем
    if (currentScroll > lastScroll)
      navbar.element.className = "navbar navbar--hidden";
    // если вверх - показываем
    else
      navbar.element.className = "navbar";
  }

  // определяет, какая секция сейчас просматривается
  function defineSection() {
    // верхняя и нижняя координаты секции
    var coords;
    // половина высоты экрана
    var half = window.innerHeight / 2;

    // определяем, какая секция сейчас просматривается
    for (var i = 0; i < sections.length; i++) {
      // получаем координаты секции
      coords = getCoords(sections[i], i);
      // проверяем по координатам, просматривается ли сейчас секция
      if (currentScroll > coords.top - half &&
          currentScroll < coords.bottom - half) {
        // запоминаем просматриваемую секцию
        currentSection = sections[i];
        return;
      }
    }
  }

  // возвращает верхнюю и нижнюю координаты секции
  function getCoords(section, index) {
    // высчитываем верхнюю
    var top = 0;
    for (var i = index - 1; i >= 0; i--)
      top += sections[i].offsetHeight || 0;
    // высчитываем нижнюю
    var bottom = top + section.offsetHeight;

    return {top: top, bottom: bottom}
  }

  // подсвечивает ссылки в навигации
  function highlightLink(currentSection) {
    // получаем номер ссылки
    var index = sections.indexOf(currentSection);
    // сначала сбрасываем все ссылки
    Array.prototype.forEach.call(navbar.links, function(link) {
      link.classList.remove("nav__link--current");
    });
    // потом подсвечиваем нужную
    navbar.links[index].classList.add("nav__link--current");
  }
})();
