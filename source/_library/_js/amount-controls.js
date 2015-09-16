// minus / plus btns

var minus = popupSearchForm.querySelector(".btn--minus");
var plus = popupSearchForm.querySelector(".btn--plus");
var amount = popupSearchForm.querySelector("[name=amount]");

minus.addEventListener("click", function (event) {
  event.preventDefault();
  if (amount.value > 0) {
    amount.value--;
  };
});

plus.addEventListener("click", function (event) {
  event.preventDefault();
  amount.value++;
});