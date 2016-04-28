/**
 * Конструктор для ползунка.
 * html: .slider>.thumb
 * Реализовано только визуальное оформление.
 * Требование: у ползунка должно быть относительное позиционирование.
 * Потребуется полифил для closest()
 */

(function() {
  var slider = new Slider({
    elem: document.getElementById("slider")
  });

  function Slider(opts) {
    var elem = opts.elem,
        thumb = elem.querySelector(".thumb"),
        elemCoords,
        shiftX,
        thumbCoords;

    elem.onmousedown = function(e) {
      if (e.target.closest(".thumb")) {
        startDrag(e.clientX, e.clientY);
        return false;
      }
    };

    function startDrag(eventClientX, eventClientY) {
      thumbCoords = thumb.getBoundingClientRect();
      shiftX = eventClientX - thumbCoords.left;

      elemCoords = elem.getBoundingClientRect();

      document.addEventListener("mousemove", moveThumb);
      document.addEventListener("mouseup", endDrag);
    }

    function moveThumb(e) {
      var thumbNewCoordX = e.clientX - shiftX - elemCoords.left,
          leftEdge = 0,
          rightEdge = elemCoords.right - elemCoords.left - thumb.offsetWidth;

      if (thumbNewCoordX < leftEdge) {
        thumbNewCoordX = 0;
      } else if (thumbNewCoordX > rightEdge) {
        thumbNewCoordX = elemCoords.right - elemCoords.left - thumb.offsetWidth;
      }

      thumb.style.left = thumbNewCoordX + "px";
    }

    function endDrag() {
      document.removeEventListener("mousemove", moveThumb);
      document.removeEventListener("mouseup", endDrag);
    }
  }
})();
