/**
 * Конструктор для контейнера с картой, у которого должна меняться высота.
 * html: .contaner>.map+.overlay>a.link-expand
 * Overlay может быть, а может и не быть.
 * Полифилы вроде не нужны.
 */

(function() {
  var mapContainer = new resizableMapContainer({
    element: document.querySelector(".map-container"),
    btnClass: null,
    btnNewText: "Close map",
    classExpand: "map-container--expand",
    overlay: null,
    removedOverlayClass: "map-container__overlay--hide"
  });

  function resizableMapContainer(options) {
    var element = options.element,
        btnClass = options.btnClass || ".link-expand",
        btn = element.querySelector(btnClass),
        btnOldText = btn.innerHTML,
        btnNewText = options.btnNewText || "Close",
        classExpand = options.classExpand,
        overlay = options.overlayClass || element.querySelector("[class*=overlay]") || null,
        removedOverlayClass = options.removedOverlayClass || null;

    btn.addEventListener("click", function(event) {
      toggle(element);
      event.preventDefault();
    });

    function toggle() {
      if (!element.classList.contains(classExpand)) {
        element.classList.add(classExpand);
        btn.innerHTML = btnNewText;
        if (overlay) overlay.classList.add(removedOverlayClass);
      } else if (element.classList.contains(classExpand)) {
        element.classList.remove(classExpand);
        btn.innerHTML = btnOldText;
        if (overlay) overlay.classList.remove(removedOverlayClass);
      }
    }
  }
})();
