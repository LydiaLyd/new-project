 // пыталась изменить расчет ширины input:number по его содержимому.
 // естественно, ничего не работает - в js я полный идиот.
 // пока скрипт вставлен инлайново (он у меня работает только так).

var minPrice = document.querySelector("[name=min-price]");
var maxPrice = document.querySelector("[name=max-price]");

minPrice.addEventListener("keypress", function (event) {
 this.style.width = ((this.value.length + 1)*8) + 'px';
});

maxPrice.addEventListener("keypress", function (event) {
 this.style.width = ((this.value.length + 1)*8) + 'px';
});
