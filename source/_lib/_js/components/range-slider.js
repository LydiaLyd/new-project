/**
 * Конструктор для ползунка.
 * html: .slider>.scale>.thumb^+div{Result: }>output.result
 * Требование: у thumb должно быть относительное позиционирование.
 */

(function() {
  var slider = new Slider({
    elem: document.getElementById("slider"),
    max: 100
  });

  slider.setValue(75);



  function Slider(opts) {
    var elem = this.elem = opts.elem;

    var scale = elem.querySelector(".scale"),
       scaleCoords = scale.getBoundingClientRect();

    var thumb = elem.querySelector(".thumb"),
       thumbCoords,
       shiftX;

    var max = opts.max || 100,
       pixelsPerValue = (scale.offsetWidth - thumb.offsetWidth) / max;

    var result = this.result = elem.querySelector(".result");

   // когда нажали на thumb, запускает startDrag
    elem.onmousedown = function(e) {
      if (e.target === thumb) {
        startDrag(e.clientX);
        return false;
      }
    };

   // когда происходит событие slide,
   // отобразить значение диапазона в result
    elem.addEventListener("slide", function(e) {
      result.innerHTML = e.detail;
    });

    // задает положение thumb, запускает событие slide
    this.setValue = function(value) {
      var coordX = valueToPosition(value);
      thumb.style.left = coordX + "px";

      dispatchSlideEvent(coordX);
    };

    // начало перетаскивания thumb
    function startDrag(eventClientX) {
      thumbCoords = thumb.getBoundingClientRect();
      shiftX = eventClientX - thumbCoords.left;

      document.addEventListener("mousemove", moveThumb);
      document.addEventListener("mouseup", endDrag);
    }

    // перемещает thumb при движении мыши,
    // запускает событие slide
    function moveThumb(e) {
      var newCoordX = e.clientX - shiftX - scaleCoords.left,
          leftEdge = 0,
          rightEdge = scale.offsetWidth - thumb.offsetWidth;

      if (newCoordX < leftEdge) {
        newCoordX = leftEdge;
      } else if (newCoordX > rightEdge) {
        newCoordX = rightEdge;
      }

      thumb.style.left = newCoordX + "px";

      dispatchSlideEvent(newCoordX);
    }

    // конец перетаскивания thumb
    function endDrag() {
      document.removeEventListener("mousemove", moveThumb);
      document.removeEventListener("mouseup", endDrag);
    }

    // для запуска события slide при перемещении thumb
    function dispatchSlideEvent(coordX) {
      var slideEvent = new CustomEvent("slide", {
        bubbles: true,
        detail: positionToValue(coordX)
      });
      elem.dispatchEvent(slideEvent);
    }

    // переводит координату thumb в значение диапазона
    function positionToValue(left) {
      return Math.round(left / pixelsPerValue);
    }

    // переводит значение диапазона в координату thumb
    function valueToPosition(value) {
      return value * pixelsPerValue;
    }
  }

})();
