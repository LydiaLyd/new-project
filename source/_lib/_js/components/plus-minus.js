/**
 * Компонент с кнопками +/-
 * html: .container>btn.minus+output.result+btn.plus
 * Потребуется полифил для closest()
 */

function PlusMinus(options) {
  var element = options.element,
      btnMinus = element.querySelector("[class*=minus]"),
      btnPlus = element.querySelector("[class*=plus]"),
      result = element.querySelector("[class*=result]");

  element.onclick = function(event) {
    var target = event.target.closest("button");

    if (target === btnMinus) decrease();
    else if (target === btnPlus) increase();
  };

  function decrease() {
    result.innerHTML = Number(result.innerHTML) - 1;
  }

  function increase() {
    result.innerHTML = Number(result.innerHTML) + 1;
  }

  this.setValue = function(value) {
    result.innerHTML = value;
  };
}
