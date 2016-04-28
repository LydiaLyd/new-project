// https://github.com/rogerluiz/Miniscroll-JS

// Перебираем все элементы с классом .scroller
[].forEach.call(document.querySelectorAll(".scroller"), function(elem, i) {
  // добавляем каждому элементу класс scroller-n
  elem.classList.add("scroller-" + (i + 1));

  // вызываем new Miniscroll для всех элементов с классом .scroller-n
  new Miniscroll(".scroller-" + (i + 1), {
    axis: "y",
    size: 5,
    sizethumb: "auto",
    onScroll: function(percent, offset) {},
    thumbColor: "#95e1d3",
    trackerColor: "#f8f8f8"
  });
});
