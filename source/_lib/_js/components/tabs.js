/**
 * Конструктор для табов.
 * html: .tabs>.tab*n>btn.toggle
 * Потребуется полифил для closest()
 */

(function() {
  var tabs = new Tabs({
    container: document.querySelector(".tabs"),
    tabClass: null,
    activeTabClass: null,
    btnClass: null,
    activeBtnClass: null
  });

  function Tabs(options) {
    var container = options.container,
        tabClass = options.tabClass || ".tabs__item",
        activeTabClass = options.activeTabClass || "tabs__item--active",
        btnClass = options.btnClass || ".btn--toggle-tab",
        activeBtnClass = options.activeBtnClass || "btn--active-tab",
        activeTab = container.querySelector("." + activeTabClass) || null;

    container.addEventListener("click", function(event) {
      var target = event.target;
      if (!target.closest(btnClass)) {
        return false;
      }

      var tab = target.closest(tabClass);
      toggle(tab, target);

      event.preventDefault();
    });

    function toggle(tab, btn) {
      if (activeTab && tab !== activeTab) {
        activeTab.classList.remove(activeTabClass);
        activeTab.querySelector(btnClass).classList.remove(activeBtnClass);
      }

      tab.classList.toggle(activeTabClass);
      btn.classList.toggle(activeBtnClass);

      activeTab = tab;
    }
  }
})();
