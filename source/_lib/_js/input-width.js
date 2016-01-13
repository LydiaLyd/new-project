
// Изменение ширины инпута.
// Я не понимаю, почему это работает как надо (практически).
// Еще: если нажать и не отпускать Back Space, поле не ссужается. Нужно исправить.

(function() {
  if (!document.querySelector("[name=min-price]") && !document.querySelector("[name=max-price]")) {
    return;
  }

  var minPrice = document.querySelector("[name=min-price]"),
      maxPrice = document.querySelector("[name=max-price]");

  changeWidth(minPrice);
  changeWidth(maxPrice);

  function changeWidth(field) {
    // поле расширяется, когда мы набираем цифры
    field.addEventListener("keypress", function() {
      // 8 is the magic number
      field.style.width = field.value.length * 8 + "px";
    });

    // поле ссужается, когда мы убираем цифры
    field.addEventListener("keyup", function() {
      // не понимаю, почему нельзя обойтись без условия
      // но с ним все работает правильно
      if (field.value.length > 0)
        field.style.width = field.value.length * 8 + "px";
    });
  }
})();



/*
  html
    <label>From <input name="min-price" type="number" value="0"></label>
    <label>to <input name="max-price" type="number" value="10000"></label>

  css
    [type="number"] {
      width: 8px;
      max-width: 80px;
      -moz-appearance: textfield;

      &::-webkit-inner-spin-button,
      &::-webkit-outer-spin-button {
        -webkit-appearance: none;
      }
    }
*/
