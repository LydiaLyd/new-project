(function() {
  var minus = document.querySelector(".btn--minus");
  var plus = document.querySelector(".btn--plus");
  var amount = document.querySelector("[name=amount]");

  minus.addEventListener("click", function (event) {
    event.preventDefault();
    if (amount.value > 0) {
      amount.value--;
    }
  });

  plus.addEventListener("click", function (event) {
    event.preventDefault();
    amount.value++;
  });
})();
